export default function LawyerInvoicesPage() {
  const invoices = [
    { no: "INV-4452", date: "2025-10-12", client: "Meera Shah", service: "Document Draft", amount: 3500, status: "Paid" },
    { no: "INV-4418", date: "2025-09-29", client: "Anil Singh", service: "Affidavit Guidance", amount: 1500, status: "Paid" },
    { no: "INV-4403", date: "2025-09-18", client: "Ravi Kumar", service: "Consultation", amount: 1200, status: "Paid" },
  ];
  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-2xl font-semibold">Invoices</h1>
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">View and download your invoices.</p>

      <div className="mt-6 overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b bg-zinc-50 text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300">
              <th className="px-3 py-2">Invoice #</th>
              <th className="px-3 py-2">Date</th>
              <th className="px-3 py-2">Client</th>
              <th className="px-3 py-2">Service</th>
              <th className="px-3 py-2">Amount</th>
              <th className="px-3 py-2">Status</th>
              <th className="px-3 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((inv) => (
              <tr key={inv.no} className="border-b last:border-0 dark:border-zinc-800">
                <td className="px-3 py-2 font-mono text-xs">{inv.no}</td>
                <td className="px-3 py-2">{inv.date}</td>
                <td className="px-3 py-2">{inv.client}</td>
                <td className="px-3 py-2">{inv.service}</td>
                <td className="px-3 py-2">₹{inv.amount}</td>
                <td className="px-3 py-2">{inv.status}</td>
                <td className="px-3 py-2">
                  <button className="rounded border px-2 py-1 text-xs hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-900">Download</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
