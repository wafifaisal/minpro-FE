const users = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    lastLogin: "2023-06-01",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    lastLogin: "2023-06-02",
  },
  {
    id: 3,
    name: "Bob Johnson",
    email: "bob@example.com",
    lastLogin: "2023-06-01",
  },
  {
    id: 4,
    name: "Alice Brown",
    email: "alice@example.com",
    lastLogin: "2023-05-31",
  },
  {
    id: 5,
    name: "Charlie Wilson",
    email: "charlie@example.com",
    lastLogin: "2023-06-02",
  },
]

export function UserList() {
  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Users</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">Name</th>
              <th scope="col" className="px-6 py-3">Email</th>
              <th scope="col" className="px-6 py-3">Last Login</th>
              <th scope="col" className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="bg-white border-b">
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{user.name}</td>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4">{user.lastLogin}</td>
                <td className="px-6 py-4">
                  <button className="font-medium text-blue-600 hover:underline mr-2">Edit</button>
                  <button className="font-medium text-red-600 hover:underline">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

