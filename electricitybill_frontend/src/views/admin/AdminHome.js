import { render } from "@testing-library/react";


function AdminHome() {
    return(<div>
        <h1>Admin</h1>
        <a href="/AddZone">Add New Zone</a><br/>
        <a href="/RegisterSubadmin">Add new Subadmin</a><br/>
        <a href="/RegisterConsumer">Add new Consumer</a>
    </div>)
}
export default AdminHome;