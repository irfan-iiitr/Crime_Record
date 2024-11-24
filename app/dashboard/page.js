'use client';
import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from 'axios';

export default function Dashboard() {
    const [records, setRecords] = useState([]);
    const [filteredRecords, setFilteredRecords] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [sortOrder, setSortOrder] = useState("asc");
    const [sortColumn, setSortColumn] = useState("name");
    const [currentPage, setCurrentPage] = useState(1);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingRecord, setEditingRecord] = useState(null);
    const recordsPerPage = 5;
    const [ageFilter, setAgeFilter] = useState("");
    const [crimeFilter, setCrimeFilter] = useState("");

    useEffect(() => {
        const fetchRecords = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('https://crime-record.onrender.com/api/records', {
                    headers: { Authorization: `Bearer ${token}` },
                    params: { age: ageFilter, crime: crimeFilter }
                });
                const data = Array.isArray(response.data) ? response.data : [];
                setRecords(data);
                setFilteredRecords(data);
            } catch (err) {
                console.error("Error fetching records:", err);
                setRecords([]);
                setFilteredRecords([]);
            }
        };

        fetchRecords();
    }, [ageFilter, crimeFilter]);

    useEffect(() => {
        const filteredData = records.filter(record =>
            record.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            record.crime.toLowerCase().includes(searchQuery.toLowerCase()) ||
            record.description.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredRecords(filteredData);
    }, [searchQuery, records]);

    const handleSort = (column) => {
        const sortedRecords = [...filteredRecords].sort((a, b) => {
            if (sortOrder === "asc") return a[column] > b[column] ? 1 : -1;
            return a[column] < b[column] ? 1 : -1;
        });
        setFilteredRecords(sortedRecords);
        setSortColumn(column);
        setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    };

    const handleDelete = async (id) => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/records/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setRecords(records.filter((record) => record.id !== id));
            setFilteredRecords(filteredRecords.filter((record) => record.id !== id));
        } catch (err) {
            console.error("Error deleting record:", err);
        }
    };

    const openEditModal = (record) => {
        setEditingRecord({ ...record });
        setIsEditModalOpen(true);
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const response = await axios.put(
                `${process.env.NEXT_PUBLIC_API_URL}/records/${editingRecord.id}`, 
                editingRecord,
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );
            const updatedRecord = response.data;
            setRecords(records.map((record) => 
                record.id === editingRecord.id ? updatedRecord : record
            ));
            setFilteredRecords(filteredRecords.map((record) => 
                record.id === editingRecord.id ? updatedRecord : record
            ));
            setIsEditModalOpen(false);
        } catch (err) {
            console.error("Error updating record:", err);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditingRecord(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = filteredRecords.slice(indexOfFirstRecord, indexOfLastRecord);
    const totalPages = Math.ceil(filteredRecords.length / recordsPerPage);

    return (
        <div className="p-8 max-w-5xl mx-auto">
            <h1 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-100">Criminal Records</h1>

            {/* Search Bar */}
            <div className="flex items-center mb-4">
                <Input
                    type="text"
                    placeholder="Search by name, crime, or description"
                    className="flex-1 mr-4 p-2 border rounded bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Input
                    type="number"
                    placeholder="Filter by age"
                    className="flex-1 mr-4 p-2 border rounded bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100"
                    value={ageFilter}
                    onChange={(e) => setAgeFilter(e.target.value)}
                />
                <Input
                    type="text"
                    placeholder="Filter by crime"
                    className="flex-1 p-2 border rounded bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100"
                    value={crimeFilter}
                    onChange={(e) => setCrimeFilter(e.target.value)}
                />
            </div>

            {/* Data Table */}
            <div className="overflow-x-auto shadow-lg rounded-lg">
                <table className="min-w-full bg-white dark:bg-gray-800">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border-b-2 cursor-pointer text-gray-800 dark:text-gray-100" onClick={() => handleSort('name')}>
                                Name {sortColumn === "name" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
                            </th>
                            <th className="py-2 px-4 border-b-2 cursor-pointer text-gray-800 dark:text-gray-100" onClick={() => handleSort('age')}>
                                Age {sortColumn === "age" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
                            </th>
                            <th className="py-2 px-4 border-b-2 cursor-pointer text-gray-800 dark:text-gray-100" onClick={() => handleSort('arrest_date')}>
                                Arrest Date {sortColumn === "arrest_date" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
                            </th>
                            <th className="py-2 px-4 border-b-2 text-gray-800 dark:text-gray-100">Release Date</th>
                            <th className="py-2 px-4 border-b-2 text-gray-800 dark:text-gray-100">Crime</th>
                            <th className="py-2 px-4 border-b-2 text-gray-800 dark:text-gray-100">Description</th>
                            <th className="py-2 px-4 border-b-2 text-gray-800 dark:text-gray-100">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentRecords.map((record) => (
                            <tr key={record.id} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                                <td className="py-2 px-4 border-b text-gray-800 dark:text-gray-100">{record.name}</td>
                                <td className="py-2 px-4 border-b text-gray-800 dark:text-gray-100">{record.age}</td>
                                <td className="py-2 px-4 border-b text-gray-800 dark:text-gray-100">{record.arrest_date}</td>
                                <td className="py-2 px-4 border-b text-gray-800 dark:text-gray-100">{record.release_date}</td>
                                <td className="py-2 px-4 border-b text-gray-800 dark:text-gray-100">{record.crime}</td>
                                <td className="py-2 px-4 border-b text-gray-800 dark:text-gray-100">{record.description}</td>
                                <td className="py-2 px-4 border-b">
                                    <div className="flex space-x-2 justify-center">
                                        <Button
                                            onClick={() => openEditModal(record)}
                                            variant="outline"
                                            className="text-blue-500 hover:text-blue-700 border-blue-500 hover:border-blue-700 transition-colors duration-300"
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            onClick={() => handleDelete(record.id)}
                                            variant="outline"
                                            className="text-red-500 hover:text-red-700 border-red-500 hover:border-red-700 transition-colors duration-300"
                                        >
                                            Delete
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Edit Modal */}
            <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
                <DialogContent className="sm:max-w-[425px] bg-white dark:bg-gray-800">
                    <DialogHeader>
                        <DialogTitle className="text-gray-800 dark:text-gray-100">Edit Record</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleUpdate} className="space-y-4">
                        <div>
                            <label className="text-sm font-medium text-gray-800 dark:text-gray-100">Name</label>
                            <Input
                                name="name"
                                value={editingRecord?.name || ''}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100"
                            />
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-800 dark:text-gray-100">Age</label>
                            <Input
                                name="age"
                                type="number"
                                value={editingRecord?.age || ''}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100"
                            />
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-800 dark:text-gray-100">Arrest Date</label>
                            <Input
                                name="arrest_date"
                                type="date"
                                value={editingRecord?.arrest_date || ''}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100"
                            />
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-800 dark:text-gray-100">Release Date</label>
                            <Input
                                name="release_date"
                                type="date"
                                value={editingRecord?.release_date || ''}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100"
                            />
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-800 dark:text-gray-100">Crime</label>
                            <Input
                                name="crime"
                                value={editingRecord?.crime || ''}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100"
                            />
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-800 dark:text-gray-100">Description</label>
                            <Input
                                name="description"
                                value={editingRecord?.description || ''}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100"
                            />
                        </div>
                        <div className="flex justify-end gap-4">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setIsEditModalOpen(false)}
                            >
                                Cancel
                            </Button>
                            <Button type="submit">
                                Save Changes
                            </Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>

            {/* Pagination */}
            <div className="flex justify-between items-center mt-4">
                <Button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(currentPage - 1)}
                    variant="outline"
                >
                    Previous
                </Button>
                <span className="text-sm text-gray-800 dark:text-gray-100">
                    Page {currentPage} of {totalPages}
                </span>
                <Button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(currentPage + 1)}
                    variant="outline"
                >
                    Next
                </Button>
            </div>
        </div>
    );
}
