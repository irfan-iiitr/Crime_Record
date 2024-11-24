import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 font-sans">
      {/* Navbar */}
      {/* <header className="w-full py-4 px-8 flex justify-between items-center border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-lg">
        <div className="flex items-center space-x-2">
          <Image src="/logo.jpg" alt="Logo" width={36} height={36} />
          <span className="text-lg font-semibold tracking-wide">CriminalRecords</span>
        </div>
        <nav className="space-x-6">
          <a href="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300">Home</a>
          <a href="add-record" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300">Add Record</a>
          <a href="dashboard" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300">View Records</a>
          <a href="#contact" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300">Contact</a>
        </nav>
      </header> */}

      {/* Hero Section */}
      <section className="flex flex-col items-center text-center px-8 py-20 bg-gradient-to-r from-blue-500 to-blue-700 text-white">
        <h1 className="text-5xl font-bold mb-4 tracking-tight">Criminal Record Management</h1>
        <p className="text-lg max-w-md leading-relaxed">
          Streamline the process of adding, viewing, and managing criminal records with our efficient, secure platform.
        </p>
        <div className="mt-8 space-x-4">
          <a href="add-record" className="px-6 py-3 bg-white text-blue-700 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-300 shadow-md">
            Add New Record
          </a>
          <a href="dashboard" className="px-6 py-3 bg-gray-300 text-gray-900 rounded-full font-semibold hover:bg-gray-400 transition-colors duration-300 shadow-md">
            View Records
          </a>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="px-8 py-16 text-center bg-gray-100 dark:bg-gray-800">
        <h2 className="text-3xl font-semibold mb-8 tracking-wide">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg transform transition-transform hover:scale-105">
            <Image src="/p1.jpg" alt="Add Record" width={400} height={400} className="rounded-t-lg" />
            <h3 className="text-xl font-bold mt-4">Add Criminal Record</h3>
            <p className="text-gray-600 dark:text-gray-400 mt-2">Easily add new criminal records with essential details.</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg transform transition-transform hover:scale-105">
            <Image src="/p2.jpg" alt="View Records" width={400} height={400} className="rounded-t-lg" />
            <h3 className="text-xl font-bold mt-4">View & Search Records</h3>
            <p className="text-gray-600 dark:text-gray-400 mt-2">Quickly view and search through criminal records.</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg transform transition-transform hover:scale-105">
            <Image src="/p3.jpg" alt="Data Security" width={400} height={400} className="rounded-t-lg" />
            <h3 className="text-xl font-bold mt-4">Data Security</h3>
            <p className="text-gray-600 dark:text-gray-400 mt-2">Built with security in mind to protect sensitive information.</p>
          </div>
        </div>
      </section>

      {/* Add Record Section */}
      <section id="add-record" className="bg-gray-100 dark:bg-gray-800 py-16 text-center px-8">
        <h2 className="text-3xl font-semibold mb-8 tracking-wide">Add a New Record</h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto mb-8 leading-relaxed">
          Fill in the necessary information to add a new criminal record to the database. Ensure accuracy and completeness for reliable tracking.
        </p>
        <a href="#add-form" className="px-8 py-3 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors duration-300 shadow-md">
          Go to Form
        </a>
      </section>

      {/* View Records Section */}
      <section id="view-records" className="px-8 py-16 text-center bg-white dark:bg-gray-900">
        <h2 className="text-3xl font-semibold mb-8 tracking-wide">View Criminal Records</h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto mb-8 leading-relaxed">
          Access the full list of criminal records, with search and filter functionalities to find specific entries quickly.
        </p>
        <a href="#records-table" className="px-8 py-3 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors duration-300 shadow-md">
          View Records
        </a>
      </section>

      {/* Contact Section */}
      <section id="contact" className="px-8 py-16 text-center bg-gray-100 dark:bg-gray-800">
        <h2 className="text-3xl font-semibold mb-4 tracking-wide">Contact Us</h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto mb-8 leading-relaxed">
          Have questions or need support? Reach out to our team for assistance.
        </p>
        <a href="mailto:support@criminalrecords.com" className="px-8 py-3 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors duration-300 shadow-md">
          Email Support
        </a>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-800">
        <p>&copy; 2024 CriminalRecords. All rights reserved.</p>
      </footer>
    </div>
  );
}

