export default function UnauthorizedPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-4xl font-bold mb-4 text-red-600">403 - Unauthorized</h1>
      <p className="mb-6 text-center text-lg">
        Sorry, you do not have permission to view this page.
      </p>
    </div>
  )
}