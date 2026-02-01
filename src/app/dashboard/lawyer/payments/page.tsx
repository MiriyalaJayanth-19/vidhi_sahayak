export default function LawyerPaymentsPage() {
  const pending = [
    { id: "P-204", client: "Ravi Kumar", amount: 2500, service: "Consultation", date: "2025-10-20" },
  ];
  const completed = [
    { id: "P-201", client: "Meera Shah", amount: 3500, service: "Document Draft", date: "2025-10-10" },
    { id: "P-198", client: "Anil Singh", amount: 1500, service: "Affidavit Guidance", date: "2025-09-29" },
  ];
  const totalPending = pending.reduce((s, p) => s + p.amount, 0);
  const totalCompleted = completed.reduce((s, p) => s + p.amount, 0);
  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-2xl font-semibold">Payments</h1>
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">Track pending and completed payouts.</p>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <div className="rounded-lg border bg-white p-4 text-sm dark:border-zinc-800 dark:bg-zinc-950">
          <div className="text-zinc-500">Pending amount</div>
          <div className="mt-1 text-xl font-semibold">₹{totalPending}</div>
        </div>
        <div className="rounded-lg border bg-white p-4 text-sm dark:border-zinc-800 dark:bg-zinc-950">
          <div className="text-zinc-500">Completed payouts</div>
          <div className="mt-1 text-xl font-semibold">₹{totalCompleted}</div>
        </div>
        <div className="rounded-lg border bg-white p-4 text-sm dark:border-zinc-800 dark:bg-zinc-950">
          <div className="text-zinc-500">Next payout</div>
          <div className="mt-1 text-xl font-semibold">In 3 days</div>
        </div>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <div>
          <h2 className="mb-2 text-base font-medium">Pending</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b bg-zinc-50 text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300">
                  <th className="px-3 py-2">ID</th>
                  <th className="px-3 py-2">Client</th>
                  <th className="px-3 py-2">Service</th>
                  <th className="px-3 py-2">Amount</th>
                  <th className="px-3 py-2">Date</th>
                </tr>
              </thead>
              <tbody>
                {pending.map((p) => (
                  <tr key={p.id} className="border-b last:border-0 dark:border-zinc-800">
                    <td className="px-3 py-2 font-mono text-xs">{p.id}</td>
                    <td className="px-3 py-2">{p.client}</td>
                    <td className="px-3 py-2">{p.service}</td>
                    <td className="px-3 py-2">₹{p.amount}</td>
                    <td className="px-3 py-2">{p.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div>
          <h2 className="mb-2 text-base font-medium">Completed</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b bg-zinc-50 text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300">
                  <th className="px-3 py-2">ID</th>
                  <th className="px-3 py-2">Client</th>
                  <th className="px-3 py-2">Service</th>
                  <th className="px-3 py-2">Amount</th>
                  <th className="px-3 py-2">Date</th>
                </tr>
              </thead>
              <tbody>
                {completed.map((p) => (
                  <tr key={p.id} className="border-b last:border-0 dark:border-zinc-800">
                    <td className="px-3 py-2 font-mono text-xs">{p.id}</td>
                    <td className="px-3 py-2">{p.client}</td>
                    <td className="px-3 py-2">{p.service}</td>
                    <td className="px-3 py-2">₹{p.amount}</td>
                    <td className="px-3 py-2">{p.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
