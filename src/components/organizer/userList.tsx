const users = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    transactionDate: "2023-06-01",
    eventNames: "International Film Festival",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    transactionDate: "2023-06-02",
    eventNames: "Food & Wine Expo",
  },
  {
    id: 3,
    name: "Bob Johnson",
    email: "bob@example.com",
    transactionDate: "2023-06-01",
    eventNames: "Tech Conference 2023",
  },
  {
    id: 4,
    name: "Alice Brown",
    email: "alice@example.com",
    transactionDate: "2023-05-31",
    eventNames: "Marathon 2023",
  },
  {
    id: 5,
    name: "Charlie Wilson",
    email: "charlie@example.com",
    transactionDate: "2023-06-02",
    eventNames: "Summer Music Festival",
  },
];

export function UserList() {
  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Buyers</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Transaction Date
              </th>
              <th scope="col" className="px-6 py-3">
                Event
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="bg-white border-b">
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                  {user.name}
                </td>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4">{user.transactionDate}</td>
                <td className="px-6 py-4">{user.eventNames}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
