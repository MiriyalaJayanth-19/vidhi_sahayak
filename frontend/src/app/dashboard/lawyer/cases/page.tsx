export default function LawyerCasesPage() {
  const cases = [
    { id: "C-1021", title: "Sale Deed Dispute", client: "Ravi Kumar", status: "Open", updated: "2025-10-18" },
    { id: "C-1019", title: "Rental Agreement Draft", client: "Meera Shah", status: "In progress", updated: "2025-10-15" },
    { id: "C-1007", title: "Affidavit for Name Change", client: "Anil Singh", status: "Closed", updated: "2025-09-27" },
  ];
  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-2xl font-semibold">Cases</h1>
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">Track and manage your matters.</p>

      <div className="mt-6 flex items-center gap-2">
        <input placeholder="Search cases..." className="w-full max-w-sm rounded-md border bg-transparent px-3 py-2 text-sm outline-none dark:border-zinc-800" />
        <select className="rounded-md border bg-transparent px-2 py-2 text-sm outline-none dark:border-zinc-800">
          <option>All</option>
          <option>Open</option>
          <option>In progress</option>
          <option>Closed</option>
        </select>
      </div>

      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b bg-zinc-50 text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300">
              <th className="px-3 py-2">Case ID</th>
              <th className="px-3 py-2">Title</th>
              <th className="px-3 py-2">Client</th>
              <th className="px-3 py-2">Status</th>
              <th className="px-3 py-2">Last updated</th>
              <th className="px-3 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {cases.map((c) => (
              <tr key={c.id} className="border-b last:border-0 dark:border-zinc-800">
                <td className="px-3 py-2 font-mono text-xs">{c.id}</td>
                <td className="px-3 py-2">{c.title}</td>
                <td className="px-3 py-2">{c.client}</td>
                <td className="px-3 py-2">{c.status}</td>
                <td className="px-3 py-2">{c.updated}</td>
                <td className="px-3 py-2">
                  <button className="rounded border px-2 py-1 text-xs hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-900">Open</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
