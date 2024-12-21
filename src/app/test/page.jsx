import CardList from '../cards/cardlist';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-6">Card Templates</h1>
      <CardList />
    </main>
  );
}
