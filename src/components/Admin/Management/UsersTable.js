import React from 'react'
import MUIDataTable from 'mui-datatables'

const UsersTable = (props) => {

    const columns = [
        {
            name: "createdAt",
            label: "Created",
            options: {
                display:"excluded"
            }
        },
        {
            name: "email",
            label: "Email",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "email_verified",
            label: "Email Verified",
            options: {
                display:"excluded"
            }
        },
        {
            name: "identities",
            label: "Identities",
            options: {
                display:"excluded"
            }
        },
        {
            name: "name",
            label: "Name",
            options: {
                filter: true,
                sort: true,
            }
        },
        
       ];

       const options = {
        filterType: 'checkbox',
        onRowClick:(rowData, rowMeta, rowIndex)=>{}
    }

       return (
        <>
            <MUIDataTable
                title={"Users"}
                data={props.users}
                columns={columns}
                options={options}
            />
        </>
        
    )

}



export default UsersTable


