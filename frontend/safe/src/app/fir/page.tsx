'use client';

import { useState } from 'react';
import { addFIR, searchFIR, updateFIR, type FIR } from '@/services/firService';
import { Plus, Search, Edit2, X } from 'lucide-react';

export default function FIRPage() {
  const [activeTab, setActiveTab] = useState<'add' | 'search'>('add');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  
  // Form state for adding FIR
  const [formData, setFormData] = useState({
    date_reported: new Date().toISOString().split('T')[0],
    date_of_occurrence: '',
    time_of_occurrence: '',
    city: '',
    crime_code: '',
    crime_description: '',
    victim_age: '',
    victim_gender: '',
    weapon_used: '',
    crime_domain: '',
    police_deployed: '',
    case_closed: 'No',
    date_case_closed: '',
  });

  // Search state
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState<'report_number' | 'city' | 'crime_description'>('report_number');
  const [searchResults, setSearchResults] = useState<FIR[]>([]);
  const [selectedFIR, setSelectedFIR] = useState<FIR | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState<Partial<FIR>>({});

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await addFIR(formData as any);
      
      if (response.success) {
        setMessage(`✓ FIR added successfully! Report Number: ${response.report_number}`);
        setFormData({
          date_reported: new Date().toISOString().split('T')[0],
          date_of_occurrence: '',
          time_of_occurrence: '',
          city: '',
          crime_code: '',
          crime_description: '',
          victim_age: '',
          victim_gender: '',
          weapon_used: '',
          crime_domain: '',
          police_deployed: '',
          case_closed: 'No',
          date_case_closed: '',
        });
      } else {
        setMessage(`✗ Error: ${response.error}`);
      }
    } catch (error) {
      setMessage(`✗ Error: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setLoading(true);
    try {
      const response = await searchFIR(searchQuery, searchType);
      setSearchResults(response.firs || []);
      setMessage(response.found ? `Found ${response.count} FIR(s)` : 'No FIRs found');
    } catch (error) {
      setMessage(`✗ Search error: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  const handleEditFIR = (fir: FIR) => {
    setSelectedFIR(fir);
    setEditData(fir);
    setEditMode(true);
  };

  const handleUpdateFIR = async () => {
    if (!selectedFIR) return;

    setLoading(true);
    try {
      // Filter out unchanged fields
      const updates: Partial<FIR> = {};
      Object.keys(editData).forEach(key => {
        if (editData[key as keyof FIR] !== selectedFIR[key as keyof FIR]) {
          updates[key as keyof FIR] = editData[key as keyof FIR];
        }
      });

      if (Object.keys(updates).length === 0) {
        setMessage('No changes to update');
        setEditMode(false);
        return;
      }

      const response = await updateFIR(selectedFIR['Report Number'], updates);
      
      if (response.success) {
        setMessage('✓ FIR updated successfully!');
        setEditMode(false);
        setSelectedFIR(null);
        // Refresh search results
        if (searchQuery) {
          const searchResponse = await searchFIR(searchQuery, searchType);
          setSearchResults(searchResponse.firs || []);
        }
      } else {
        setMessage(`✗ Error: ${response.error}`);
      }
    } catch (error) {
      setMessage(`✗ Update error: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white pt-24">
      {/* Header */}
      <div className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            FIR Management
          </h1>
          <p className="text-slate-400 mt-1">Add, search, and manage First Information Reports</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-slate-800">
          <button
            onClick={() => setActiveTab('add')}
            className={`px-4 py-3 font-medium transition-colors border-b-2 ${
              activeTab === 'add'
                ? 'border-blue-400 text-blue-400'
                : 'border-transparent text-slate-400 hover:text-slate-300'
            }`}
          >
            <Plus className="inline mr-2 h-5 w-5" />
            Add New FIR
          </button>
          <button
            onClick={() => setActiveTab('search')}
            className={`px-4 py-3 font-medium transition-colors border-b-2 ${
              activeTab === 'search'
                ? 'border-blue-400 text-blue-400'
                : 'border-transparent text-slate-400 hover:text-slate-300'
            }`}
          >
            <Search className="inline mr-2 h-5 w-5" />
            Search & Edit FIRs
          </button>
        </div>

        {/* Message */}
        {message && (
          <div className={`mb-6 p-4 rounded-lg ${message.includes('✓') ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
            {message}
          </div>
        )}

        {/* Add FIR Tab */}
        {activeTab === 'add' && (
          <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Date Reported */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Date Reported *</label>
                  <input
                    type="date"
                    name="date_reported"
                    value={formData.date_reported}
                    onChange={handleFormChange}
                    required
                    className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:border-blue-400 focus:outline-none"
                  />
                </div>

                {/* Date of Occurrence */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Date of Occurrence *</label>
                  <input
                    type="date"
                    name="date_of_occurrence"
                    value={formData.date_of_occurrence}
                    onChange={handleFormChange}
                    required
                    className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:border-blue-400 focus:outline-none"
                  />
                </div>

                {/* Time of Occurrence */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Time of Occurrence *</label>
                  <input
                    type="time"
                    name="time_of_occurrence"
                    value={formData.time_of_occurrence}
                    onChange={handleFormChange}
                    required
                    className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:border-blue-400 focus:outline-none"
                  />
                </div>

                {/* City */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">City *</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleFormChange}
                    placeholder="e.g., Mumbai"
                    required
                    className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:border-blue-400 focus:outline-none"
                  />
                </div>

                {/* Crime Code */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Crime Code *</label>
                  <input
                    type="text"
                    name="crime_code"
                    value={formData.crime_code}
                    onChange={handleFormChange}
                    placeholder="e.g., IPC-379"
                    required
                    className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:border-blue-400 focus:outline-none"
                  />
                </div>

                {/* Victim Age */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Victim Age *</label>
                  <input
                    type="number"
                    name="victim_age"
                    value={formData.victim_age}
                    onChange={handleFormChange}
                    placeholder="25"
                    required
                    className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:border-blue-400 focus:outline-none"
                  />
                </div>

                {/* Victim Gender */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Victim Gender *</label>
                  <select
                    name="victim_gender"
                    value={formData.victim_gender}
                    onChange={handleFormChange}
                    required
                    className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:border-blue-400 focus:outline-none"
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {/* Weapon Used */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Weapon Used *</label>
                  <input
                    type="text"
                    name="weapon_used"
                    value={formData.weapon_used}
                    onChange={handleFormChange}
                    placeholder="e.g., Knife, Gun, None"
                    required
                    className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:border-blue-400 focus:outline-none"
                  />
                </div>

                {/* Crime Domain */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Crime Domain *</label>
                  <input
                    type="text"
                    name="crime_domain"
                    value={formData.crime_domain}
                    onChange={handleFormChange}
                    placeholder="e.g., Cybercrime, Violent Crime"
                    required
                    className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:border-blue-400 focus:outline-none"
                  />
                </div>

                {/* Police Deployed */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Police Deployed *</label>
                  <select
                    name="police_deployed"
                    value={formData.police_deployed}
                    onChange={handleFormChange}
                    required
                    className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:border-blue-400 focus:outline-none"
                  >
                    <option value="">Select Option</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>

                {/* Case Closed */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Case Closed *</label>
                  <select
                    name="case_closed"
                    value={formData.case_closed}
                    onChange={handleFormChange}
                    required
                    className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:border-blue-400 focus:outline-none"
                  >
                    <option value="No">In Progress</option>
                    <option value="Yes">Closed</option>
                  </select>
                </div>

                {/* Date Case Closed */}
                {formData.case_closed === 'Yes' && (
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Date Case Closed</label>
                    <input
                      type="date"
                      name="date_case_closed"
                      value={formData.date_case_closed}
                      onChange={handleFormChange}
                      className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:border-blue-400 focus:outline-none"
                    />
                  </div>
                )}
              </div>

              {/* Crime Description */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Crime Description *</label>
                <textarea
                  name="crime_description"
                  value={formData.crime_description}
                  onChange={handleFormChange}
                  placeholder="Detailed description of the crime..."
                  required
                  rows={4}
                  className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:border-blue-400 focus:outline-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 disabled:opacity-50 text-white font-semibold py-3 rounded-lg transition-all"
              >
                {loading ? 'Submitting...' : 'Submit FIR'}
              </button>
            </form>
          </div>
        )}

        {/* Search & Edit Tab */}
        {activeTab === 'search' && (
          <div className="space-y-6">
            {!editMode ? (
              <>
                {/* Search Form */}
                <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-6">
                  <form onSubmit={handleSearch} className="space-y-4">
                    <div className="flex gap-4">
                      <select
                        value={searchType}
                        onChange={(e) => setSearchType(e.target.value as any)}
                        className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:border-blue-400 focus:outline-none"
                      >
                        <option value="report_number">Report Number</option>
                        <option value="city">City</option>
                        <option value="crime_description">Crime Description</option>
                      </select>
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Enter search query..."
                        className="flex-1 px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:border-blue-400 focus:outline-none"
                      />
                      <button
                        type="submit"
                        disabled={loading}
                        className="bg-blue-500 hover:bg-blue-600 disabled:opacity-50 text-white px-6 py-2 rounded-lg transition-colors font-medium"
                      >
                        {loading ? 'Searching...' : 'Search'}
                      </button>
                    </div>
                  </form>
                </div>

                {/* Search Results */}
                {searchResults.length > 0 && (
                  <div className="space-y-4">
                    {searchResults.map((fir) => (
                      <div key={fir['Report Number']} className="bg-slate-900/50 border border-slate-800 rounded-lg p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-lg font-semibold text-blue-400">Report #: {fir['Report Number']}</h3>
                            <p className="text-slate-400 text-sm">{fir.City} • {fir['Crime Description']}</p>
                          </div>
                          <button
                            onClick={() => handleEditFIR(fir)}
                            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
                          >
                            <Edit2 className="h-4 w-4" />
                            Edit
                          </button>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <p className="text-slate-400">Date Reported</p>
                            <p className="text-white">{fir['Date Reported']}</p>
                          </div>
                          <div>
                            <p className="text-slate-400">Victim Age</p>
                            <p className="text-white">{fir['Victim Age']}</p>
                          </div>
                          <div>
                            <p className="text-slate-400">Victim Gender</p>
                            <p className="text-white">{fir['Victim Gender']}</p>
                          </div>
                          <div>
                            <p className="text-slate-400">Case Status</p>
                            <p className={fir['Case Closed'] === 'Yes' ? 'text-green-400' : 'text-yellow-400'}>
                              {fir['Case Closed'] === 'Yes' ? 'Closed' : 'In Progress'}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            ) : selectedFIR && (
              // Edit Form
              <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-8">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-blue-400">Edit FIR #{selectedFIR['Report Number']}</h2>
                  <button
                    onClick={() => {
                      setEditMode(false);
                      setSelectedFIR(null);
                    }}
                    className="text-slate-400 hover:text-white"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Editable Fields */}
                  {['Date Reported', 'Date of Occurrence', 'Time of Occurrence', 'City', 'Crime Code', 'Crime Description', 'Victim Age', 'Victim Gender', 'Weapon Used', 'Crime Domain', 'Police Deployed', 'Case Closed', 'Date Case Closed'].map((field) => (
                    <div key={field} className={field === 'Crime Description' ? 'md:col-span-2' : ''}>
                      <label className="block text-sm font-medium text-slate-300 mb-2">{field}</label>
                      {field === 'Crime Description' ? (
                        <textarea
                          value={editData[field as keyof FIR] || ''}
                          onChange={(e) => setEditData({ ...editData, [field]: e.target.value })}
                          rows={4}
                          className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:border-blue-400 focus:outline-none"
                        />
                      ) : field === 'Victim Gender' || field === 'Police Deployed' || field === 'Case Closed' ? (
                        <select
                          value={editData[field as keyof FIR] || ''}
                          onChange={(e) => setEditData({ ...editData, [field]: e.target.value })}
                          className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:border-blue-400 focus:outline-none"
                        >
                          {field === 'Victim Gender' && (
                            <>
                              <option value="Male">Male</option>
                              <option value="Female">Female</option>
                              <option value="Other">Other</option>
                            </>
                          )}
                          {field === 'Police Deployed' && (
                            <>
                              <option value="Yes">Yes</option>
                              <option value="No">No</option>
                            </>
                          )}
                          {field === 'Case Closed' && (
                            <>
                              <option value="No">In Progress</option>
                              <option value="Yes">Closed</option>
                            </>
                          )}
                        </select>
                      ) : field === 'Victim Age' ? (
                        <input
                          type="number"
                          value={editData[field as keyof FIR] || ''}
                          onChange={(e) => setEditData({ ...editData, [field]: e.target.value })}
                          className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:border-blue-400 focus:outline-none"
                        />
                      ) : ['Date Reported', 'Date of Occurrence', 'Date Case Closed'].includes(field) ? (
                        <input
                          type="date"
                          value={editData[field as keyof FIR] || ''}
                          onChange={(e) => setEditData({ ...editData, [field]: e.target.value })}
                          className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:border-blue-400 focus:outline-none"
                        />
                      ) : field === 'Time of Occurrence' ? (
                        <input
                          type="time"
                          value={editData[field as keyof FIR] || ''}
                          onChange={(e) => setEditData({ ...editData, [field]: e.target.value })}
                          className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:border-blue-400 focus:outline-none"
                        />
                      ) : (
                        <input
                          type="text"
                          value={editData[field as keyof FIR] || ''}
                          onChange={(e) => setEditData({ ...editData, [field]: e.target.value })}
                          className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:border-blue-400 focus:outline-none"
                        />
                      )}
                    </div>
                  ))}
                </div>

                <div className="flex gap-4 mt-8">
                  <button
                    onClick={handleUpdateFIR}
                    disabled={loading}
                    className="flex-1 bg-green-500 hover:bg-green-600 disabled:opacity-50 text-white font-semibold py-3 rounded-lg transition-all"
                  >
                    {loading ? 'Updating...' : 'Save Changes'}
                  </button>
                  <button
                    onClick={() => {
                      setEditMode(false);
                      setSelectedFIR(null);
                    }}
                    className="flex-1 bg-slate-700 hover:bg-slate-600 text-white font-semibold py-3 rounded-lg transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
