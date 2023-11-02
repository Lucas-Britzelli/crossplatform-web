import React, { useState } from 'react';
import { UpdateUser } from '../UpdateUser';
import { DeleteUser } from '../DeleteUser';

interface Props {
    userId: string;
    firstName: string;
    lastName: string;
}

export const UserActions: React.FC<Props> = ({ userId, firstName, lastName }) => {
    const [isEditing, setIsEditing] = useState(false);

    const handleEditClick = () => {
        setIsEditing(!isEditing);
    };

    return (
        <div>
            <button onClick={handleEditClick}>Ändra</button>

            {isEditing && (
                <>
                    <UpdateUser userId={userId} initialFirstName={firstName} initialLastName={lastName} />
                    <DeleteUser userId={userId} />
                </>
            )}
        </div>
    );
};
