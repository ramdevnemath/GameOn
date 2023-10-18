import TableOne from '../../components/admin/TableOne';
import NavBar from '../../components/admin/NavBar'

const UsersList = () => {
  return (
    <>
      <NavBar />
      <div className="flex flex-col gap-10">
        <TableOne />
      </div>
    </>
  )
}

export default UsersList;