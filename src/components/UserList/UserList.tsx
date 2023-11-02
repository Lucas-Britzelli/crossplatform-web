import React from 'react';
import { useGetUsersQuery } from '../../store/api/usersApi';
import { UserActions } from '../UserActions';

export const UserList = () => {
    const { data, isLoading, refetch } = useGetUsersQuery({});

    return (
        <div>
            {isLoading ? <p>Loading...</p> : (
                <div>
                    <ul>
                        {data?.map((user) => (
                            <li key={user.id}>
                                {`${user.firstName} ${user.lastName}`}
                                <UserActions
                                    userId={user.id}
                                    firstName={user.firstName}
                                    lastName={user.lastName}
                                />
                            </li>
                        ))}
                    </ul>
                    <button onClick={refetch}>Reload</button>
                </div>
            )}
        </div>
    );
};
