import { ComboBoxComponent } from "@syncfusion/ej2-react-dropdowns";
import { Header } from "components";
export const loader = async () => {
  const response = await fetch("https://restcountries.com/v3.1/all");

  const data = await response.json();
  console.log("====================================");
  console.log("Data");
  console.log("====================================");
  console.log(data);
};

const CreateTrips = () => {
  loader();
  const handleSubmit = async () => {};

  return (
    <main className="flex flex-col gap-10 pb-20 wrapper">
      <Header
        title="Add a New Trip "
        description="View and edit AI generated travel plans"
      />

      <section className="mt-2.5 wrapper-md">
        <form action="#" className="trip-form" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="country">Country</label>
            <ComboBoxComponent id="country" />
          </div>
        </form>
      </section>
    </main>
  );
};

export default CreateTrips;
