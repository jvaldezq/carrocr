export default function Car({params}: { params: { id: string } }) {
    return (
        <main className="min-h-dvh pt-20">
            Post: {params.id}
        </main>
    );
}
