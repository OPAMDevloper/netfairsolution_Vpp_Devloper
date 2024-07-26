import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const ProfileContainer = styled.div`
    margin-left: 20%;
    margin-top: 5%;
    min-height: 100vh;
`;

const ProfileDetails = styled.div`
    background: #f3f4f6;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    margin-bottom: 20px;
`;

const ProfileImage = styled.img`
    width: 250px;
    height: 250px;
    border-radius: 50%;
    object-fit: cover;
    display: block;
    margin: 0 auto 20px;
`;

const UserData = styled.div`
    img {
        width: 250px;
        height: 250px;
        object-fit: cover;
        margin-right: 10px;
    }

    p {
        margin: 10px 0;
    }
`;

const FileInput = styled.div`
    margin: 20px 0;
    display: flex;
    justify-content: center;
`;

const SubmitButton = styled.button`
    display: block;
    margin: 0 auto;
    padding: 10px 20px;
    background: linear-gradient(45deg, #6b00b6, #8e2de2);
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background 0.3s ease;

    &:hover {
        background: linear-gradient(45deg, #8e2de2, #6b00b6);
    }
`;

const Index = () => {
    const [userData, setUserData] = useState(null);
    const [file, setFile] = useState(null);
    const [profileImage, setProfileImage] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/profile'); // Fetch user data
                setUserData(response.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        const fetchProfileImage = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/profile/image'); // Fetch profile image file name
                const fileName = response.data.fileName;
                console.log(fileName);
                const imageUrl = `http://localhost:5000/${fileName}`; // Assuming images are stored in 'uploads' folder on the server
                setProfileImage(imageUrl);
            } catch (error) {
                console.error('Error fetching profile image:', error);
            }
        };

        fetchUserData();
        fetchProfileImage();
    }, []);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const formData = new FormData();
            formData.append('profileimg', file); // Make sure this matches the field name expected by your backend
    
            await axios.post('http://localhost:5000/api/profile/image', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }});
            console.log('Profile picture uploaded successfully');
    
            // Fetch updated profile image
            const response = await axios.get('http://localhost:5000/api/profile/image');
            const fileName = response.data.fileName;

            const imageUrl = `http://localhost:5000/${fileName}`; // Assuming images are stored in 'uploads' folder on the server
            setProfileImage(imageUrl);
            
    
        } catch (error) {
            console.error('Error uploading profile picture:', error);
        }
    };

    return (
        <ProfileContainer>
            {profileImage && <ProfileImage src={profileImage} alt="Profile" />}

            <form onSubmit={handleSubmit}>
                <FileInput>
                    <input type="file" onChange={handleFileChange} />
                </FileInput>
                <SubmitButton type="submit">Submit Profile Picture</SubmitButton>
            </form>
            {userData ? (
                <ProfileDetails>
                    <h2>User Profile</h2>
                    <UserData>
                        <p>Email: {userData.email}</p>
                        <p>Collect Donations: {userData.collectDonations}</p>
                        <p>Annual Turnover: {userData.annualTurnover}</p>
                        <p>Business Age: {userData.businessAge}</p>
                        <p>Number of Employees: {userData.numEmployees}</p>
                        <p>Has Website: {userData.hasWebsite}</p>
                        <p>Website URL: <a href={userData.websiteUrl}>{userData.websiteUrl}</a></p>
                        <p>Description: {userData.description}</p>
                        <p>PAN: {userData.pan}</p>
                        <p>Business Name: {userData.businessName}</p>
                        <p>Registered Address: {userData.registeredAddress}</p>
                        <p>State/UT: {userData.stateUT}</p>
                        <p>Pincode: {userData.pincode}</p>
                        <p>GSTIN: {userData.gstin}</p>
                        <p>Bank Account Number: {userData.bankAccountNumber}</p>
                        <p>Bank IFSC: {userData.bankIFSC}</p>
                        <p>PAN Document: <img src={`http://localhost:5000/${userData.panDocument}`} alt="PAN Document" /></p>
                        <p>Selected Document: {userData.selectedDocument}</p>
                        <p>Bank Document: <img src={`http://localhost:5000/${userData.bankDocument}`} alt="Bank Document" /></p>
                        <p>Business Address Proof: <img src={`http://localhost:5000/${userData.businessAddressProof}`} alt="Business Address Proof" /></p>
                    </UserData>
                </ProfileDetails>
            ) : (
                <p>Loading...</p>
            )}

            
        </ProfileContainer>
    );
};

export default Index;
