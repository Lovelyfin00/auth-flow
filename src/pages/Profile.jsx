import React, { useEffect, useState } from 'react'
import AuthRequests from '../services/requests';
import { FaEnvelope, FaPhone, FaSpinner, FaUser, FaWallet } from 'react-icons/fa6';

const Profile = () => {
    const [fetchingUser, setFetchingUser] = useState(false);
    const [fetchError, setFetchError] = useState("");
    const [userData, setUserData] = useState(null);
    const [walletData, setWalletData] = useState(null);

    const getUser = async() => {
        try {
            setFetchingUser(true);
            setFetchError("");
            const response = await AuthRequests.userProfile();
            const walletResponse = await AuthRequests.myWallet();
            
            if(response.statusCode === 200 && walletResponse.statusCode === 200){
                const {profile} = response.data;
                setUserData(profile);
                setWalletData(walletResponse.data);
            } else {
                setFetchError(`Error: ${response.statusCode || walletResponse.statusCode} - ${response.message || walletResponse.message || 'Unknown error'}`);
            }
        } catch (error) {
            setFetchError(error.message || "An error occurred while fetching user data");
        } finally {
            setFetchingUser(false);
        }
    }

    useEffect(() => {
        getUser();
    }, []);

    return (
        <section className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                {fetchingUser ? (
                    <div className='flex justify-center items-center h-64'>
                        <FaSpinner className="animate-spin text-4xl text-blue-500" />
                    </div>
                ) : fetchError ? (
                    <div className='bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md shadow-md'>
                        <p className="font-bold">Error</p>
                        <p>{fetchError}</p>
                    </div>
                ) : userData && walletData ? (
                    <div className="bg-white shadow-xl rounded-lg overflow-hidden">
                        <div className="bg-blue-500 p-4 sm:p-6">
                            <div className="flex items-center justify-center">
                                <img 
                                    className="h-24 w-24 rounded-full border-4 border-white shadow-lg"
                                    src={userData.avatar || "https://via.placeholder.com/150"} 
                                    alt="Profile"
                                />
                            </div>
                            <h2 className="mt-4 text-center text-3xl font-bold text-white">
                                {userData.firstname} {userData.lastname}
                            </h2>
                        </div>
                        <div className="p-4 sm:p-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <ProfileItem icon={<FaUser />} label="Full Name" value={`${userData.firstname} ${userData.lastname}`} />
                                <ProfileItem icon={<FaEnvelope />} label="Email" value={userData.emailaddress} />
                                <ProfileItem icon={<FaPhone />} label="Phone" value={userData.phonenumber} />
                                <ProfileItem icon={<FaWallet />} label="Wallet Number" value={walletData.walletNumber} />
                                <ProfileItem 
                                    icon={<FaWallet />} 
                                    label="Wallet Balance" 
                                    value={`$${parseFloat(walletData.balance).toFixed(2)}`}
                                    className="col-span-full bg-green-50"
                                />
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className='bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded-md shadow-md'>
                        <p>No user data available</p>
                    </div>
                )}
            </div>
        </section>
    )
}

const ProfileItem = ({ icon, label, value, className = "" }) => (
    <div className={`flex items-center p-3 bg-gray-50 rounded-lg shadow-sm ${className}`}>
        <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center bg-blue-100 rounded-full text-blue-500">
            {icon}
        </div>
        <div className="ml-4">
            <p className="text-sm font-medium text-gray-500">{label}</p>
            <p className="text-lg font-semibold text-gray-900">{value}</p>
        </div>
    </div>
)

export default Profile