import React, { useEffect, useState } from "react";
import CreateAxiosInstance from "../Axios";

export default function ProfilePage() {
  const [profileData, setProfileData] = useState(null);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    bio: '',
    website: '',
    location: '',
    gender: '',
    firstName: '',
    lastName: '',
  });

  const axiosInstance = CreateAxiosInstance();

  useEffect(() => {
    // Fetch profile data from the API
    axiosInstance.get(`http://192.168.0.107:8000/authentication/get_user_profile/?id=1`)
      .then(response => {
        setProfileData(response.data);
        setFormData({
          bio: response.data.bio || '',
          website: response.data.website || '',
          location: response.data.location || '',
          gender: response.data.gender || '',
          firstName: response.data.user.first_name || '',
          lastName: response.data.user.last_name || '',
        });
      })
      .catch(error => {
        setError("Failed to fetch profile data. Please try again later.");
        console.error("Error fetching profile data:", error);
      });
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Update the user profile data in the API using PATCH
    axiosInstance.patch(`http://192.168.0.107:8000/authentication/update-user-profile/`, {
      bio: formData.bio,
      website: formData.website,
      location: formData.location,
      gender: formData.gender,
      first_name: formData.firstName,
      last_name: formData.lastName,
    })
      .then(response => {
        setProfileData(response.data);
        closeModal(); // Close the modal after a successful update
      })
      .catch(error => {
        setError("Failed to update the profile. Please try again later.");
        console.error("Error updating profile:", error);
      });
  };

  return (
    <section className="profile-section py-10">
      <div className="container mx-auto">
        <div className="breadcrumb text-gray-600 mb-4">
          <a href="#" className="hover:text-blue-500">Home</a> &gt; 
          <a href="#" className="hover:text-blue-500">User</a> &gt; 
          <span>User Profile</span>
        </div>

        <div className="profile-content">
          <div className="profile-card bg-white p-6 rounded-lg shadow-lg">
            <div className="profile-header flex items-center justify-between">
              {profileData?.profile_picture ? (
                <img
                  src={`https://api.dicebear.com/9.x/initials/svg?seed=${profileData.user.name}`}
                  alt="avatar"
                  className="avatar w-20 h-20 rounded-full object-cover"
                />
              ) : (
                <div className="avatar w-20 h-20 rounded-full bg-gray-300 flex items-center justify-center">
                  <span className="text-white">No Image</span>
                </div>
              )}
              <div className="buttons">
                <button 
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  onClick={openModal}
                >
                  Edit
                </button>
              </div>
            </div>

            {error && <p className="text-red-500 mt-4">{error}</p>}

            {profileData ? (
              <div className="info-card mt-6 space-y-4">
                <div className="info-row flex justify-between">
                  <span className="font-semibold">User ID:</span>
                  <span className="text-gray-600">{profileData.user.id}</span>
                </div>
                <div className="info-row flex justify-between">
                  <span className="font-semibold">First Name:</span>
                  <span className="text-gray-600">{profileData.user.first_name || "N/A"}</span>
                </div>
                <div className="info-row flex justify-between">
                  <span className="font-semibold">Last Name:</span>
                  <span className="text-gray-600">{profileData.user.last_name || "N/A"}</span>
                </div>
                <div className="info-row flex justify-between">
                  <span className="font-semibold">Email:</span>
                  <span className="text-gray-600">{profileData.user.email}</span>
                </div>
                <div className="info-row flex justify-between">
                  <span className="font-semibold">Bio:</span>
                  <span className="text-gray-600">{profileData.bio || "N/A"}</span>
                </div>
                <div className="info-row flex justify-between">
                  <span className="font-semibold">Website:</span>
                  <span className="text-gray-600">{profileData.website || "N/A"}</span>
                </div>
                <div className="info-row flex justify-between">
                  <span className="font-semibold">Location:</span>
                  <span className="text-gray-600">{profileData.location || "N/A"}</span>
                </div>
                <div className="info-row flex justify-between">
                  <span className="font-semibold">Date of Birth:</span>
                  <span className="text-gray-600">{profileData.date_of_birth ? new Date(profileData.date_of_birth).toLocaleDateString() : "N/A"}</span>
                </div>
                <div className="info-row flex justify-between">
                  <span className="font-semibold">Gender:</span>
                  <span className="text-gray-600">{profileData.gender || "N/A"}</span>
                </div>
              </div>
            ) : (
              <p>Loading profile data...</p>
            )}
          </div>
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg w-full max-w-md">
              <span 
                className="close cursor-pointer text-red-500 text-2xl"
                onClick={closeModal}
              >
                &times;
              </span>
              <form onSubmit={handleSubmit} className="mt-4">
                <div className="form-group mb-4">
                  <label className="block font-semibold">Bio</label>
                  <input
                    type="text"
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded mt-1"
                  />
                </div>
                <div className="form-group mb-4">
                  <label className="block font-semibold">Website</label>
                  <input
                    type="url"
                    name="website"
                    value={formData.website}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded mt-1"
                  />
                </div>
                <div className="form-group mb-4">
                  <label className="block font-semibold">Location</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded mt-1"
                  />
                </div>
                <div className="form-group mb-4">
                  <label className="block font-semibold">Gender</label>
                  <input
                    type="text"
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded mt-1"
                  />
                </div>
                <div className="form-group mb-4">
                  <label className="block font-semibold">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded mt-1"
                  />
                </div>
                <div className="form-group mb-4">
                  <label className="block font-semibold">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded mt-1"
                  />
                </div>
                <button 
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Save
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
