import React from 'react';
import { useDeleteUserMutation } from '../../store/api/usersApi';

interface Props {
    userId: string;
}

export const DeleteUser: React.FC<Props> = ({ userId }) => {
    const [deleteUser] = useDeleteUserMutation();

    const handleDelete = () => {
        deleteUser({ userId });
    };

    return (
        <button onClick={handleDelete}>Delete User</button>
    );
};
