import React, { useState } from 'react';
import { useUpdateUserMutation } from '../../store/api/usersApi';

interface Props {
    userId: string;
    initialFirstName: string;
    initialLastName: string;
}

export const UpdateUser: React.FC<Props> = ({ userId, initialFirstName, initialLastName }) => {
    const [firstName, setFirstName] = useState(initialFirstName);
    const [lastName, setLastName] = useState(initialLastName);
    const [updateUser] = useUpdateUserMutation();

    const handleSubmit = () => {
        updateUser({ userId, user: { firstName, lastName } });
    };

    return (
        <div>
            <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="First Name"
            />
            <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Last Name"
            />
            <button onClick={handleSubmit}>Update User</button>
        </div>
    );
};
