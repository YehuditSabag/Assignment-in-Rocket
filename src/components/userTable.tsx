import React from 'react';
import { Table } from 'antd';
import { User } from '../components/types';

interface UsersTableProps {
    users: User[];
    setSelectedUser: (user: User) => void;
}

const UsersTable: React.FC<UsersTableProps> = ({ users, setSelectedUser }) => {
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            filters: users ? users.map(user => ({ text: user.name, value: user.name })) : [],
            filterSearch: true,
            onFilter: (value: any, record: any) => record.name.startsWith(value),
        },
        {
            title: 'Email',
            dataIndex: 'email',
            filters: users ? users.map(user => ({ text: user.email, value: user.email })) : [],
            filterSearch: true,
            onFilter: (value: any, record:any) => record.email.startsWith(value),
        },
        {
            title: 'Company',
            dataIndex: 'company',
            render: (company: { name: string }) => company.name,
        },
    ];

    return (
        <Table
            columns={columns}
            loading={!users}
            dataSource={users}
            rowKey="id"
            onRow={(record: User) => ({
                onClick: () => setSelectedUser(record),
            })}
        />
    );
};

export default UsersTable;
