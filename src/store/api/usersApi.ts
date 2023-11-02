import { createApi } from '@reduxjs/toolkit/query/react';
import { db } from '../../firebase-config';
import { addDoc, collection, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';

const firebaseBaseQuery = async ({ baseUrl, url, method, body}) => {
    switch (method) {
        case 'GET':
            const querySnapshot = await getDocs(collection(db, url));
            const data = querySnapshot.docs.map(doc => ({id: doc.id, ...doc.data()}) );
            return { data };
        case 'POST':
            const docRef = await addDoc(collection(db, url), body);
            return { data: { id: docRef.id, ...body } };
        case 'PATCH':
            const userRefToUpdate = doc(db, url);
            await updateDoc(userRefToUpdate, body);
            return { data: { id: userRefToUpdate.id, ...body } };
        case 'DELETE':
            const userRef = doc(db, url);
            await deleteDoc(userRef);
            return { data: { id: userRef.id } };
        default:
            throw new Error(`Unhandled method ${method}`);
    }
}

export const usersApi = createApi ({
    reducerPath: 'usersApi',
    baseQuery: firebaseBaseQuery,
    endpoints: (builder) => ({
        createUser: builder.mutation({
            query: ({ user }) => ({
                baseUrl: '',
                url: 'users',
                method: 'POST',
                body: user
            })
        }),
        getUsers: builder.query({
            query: () => ({
                baseUrl: '',
                url: 'users',
                method: 'GET',
                body: {}
            })
        }),
        updateUser: builder.mutation({
            query: ({ userId, user }) => ({
                baseUrl: '',
                url: `users/${userId}`,
                method: 'PATCH',
                body: user
            })
        }),
        deleteUser: builder.mutation({
            query: ({ userId }) => ({
                baseUrl: '',
                url: `users/${userId}`,
                method: 'DELETE',
                body: {}
            })
        }),
    })
})

export const { useCreateUserMutation, useGetUsersQuery, useUpdateUserMutation, useDeleteUserMutation } = usersApi;
