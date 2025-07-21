import { Header, StateCard, TripCard } from "components";

const allTrips = [
  {
    id: 1,
    name: "Tropical Rewind",
    imageUrls: ["/assets/images/sample1.jpg"],
    itinerary: [{ location: "Thailand" }],
    tags: ["Adventure", "Culture"],
    travelStyle: "Solo",
    estimatedPrice: "$1,000",
  },
  {
    id: 2,
    name: "French Reverie",
    imageUrls: ["/assets/images/sample2.jpg"],
    itinerary: [{ location: "Paris" }],
    tags: ["Relaxation", "Culinary"],
    travelStyle: "Family",
    estimatedPrice: "$2,000",
  },
  {
    id: 3,
    name: "Zen Break",
    imageUrls: ["/assets/images/sample3.jpg"],
    itinerary: [{ location: "Japan" }],
    tags: ["Shopping", "Luxury"],
    travelStyle: "Couple",
    estimatedPrice: "$3,000",
  },
  {
    id: 4,
    name: "Adventure in Westeros",
    imageUrls: ["/assets/images/sample4.jpg"],
    itinerary: [{ location: "Croatia" }],
    tags: ["Historical", "Culture"],
    travelStyle: "Friends",
    estimatedPrice: "$4,000",
  },
];

const dashboard = () => {
  const user = {
    name: "kaushal",
  };

  const dashboardStats = {
    totalUser: 12000,
    usersJoined: { currentMonth: 219, lastMonth: 198 },
    totalTrips: 3000,
    tripsCreated: { currentMonth: 150, lastMonth: 204 },
    userRole: { total: 50, currentMonth: 24, lastMonth: 12 },
  };
  return (
    <main className="dashboard wrapper">
      <Header
        title={`Welcome ${user?.name ?? "Guest"}👋`}
        description="Track activity, trends and popular destinations in real time"
      />
      <section className="flex flex-col gap-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StateCard
            headerTitle="Total Users"
            total={dashboardStats.totalUser}
            currentMonthCount={dashboardStats.usersJoined.currentMonth}
            lastMonthCount={dashboardStats.usersJoined.lastMonth}
          />
          <StateCard
            headerTitle="Total Trips"
            total={dashboardStats.totalTrips}
            currentMonthCount={dashboardStats.tripsCreated.currentMonth}
            lastMonthCount={dashboardStats.tripsCreated.lastMonth}
          />
          <StateCard
            headerTitle="Active Users "
            total={dashboardStats.userRole.total}
            currentMonthCount={dashboardStats.userRole.currentMonth}
            lastMonthCount={dashboardStats.userRole.lastMonth}
          />
        </div>
      </section>
      <section className="container">
        <h1 className="text-xl font-semibold text-dark-100">Created Trip</h1>
        <div className="trip-grid">
          {allTrips
            .slice(0, 4)
            .map(({ id, name, imageUrls, itinerary, estimatedPrice, tags }) => (
              <TripCard
                key={id}
                id={id.toString()}
                name={name}
                imageUrl={imageUrls[0]}
                location={itinerary?.[0]?.location ?? ""}
                tags={tags}
                price={estimatedPrice}
              />
            ))}
        </div>
      </section>
    </main>
  );
};

export default dashboard;
