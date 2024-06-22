import { useState } from "react";

const MallSelection = () => {
  const [selectedCheckbox, setSelectedCheckbox] = useState(null);

  const handleCheckboxChange = (event) => {
    const checkboxValue = event.target.value;
    const isChecked = event.target.checked;

    if (isChecked) {
      setSelectedCheckbox(checkboxValue);
    } else {
      setSelectedCheckbox(null);
    }
  };

  return (
    <div className="text-primary ">
      <div className="py-1">
        <input
          type="checkbox"
          id="Jamuna"
          name="Jamuna"
          value="Jamuna Future Park"
          checked={selectedCheckbox === "Jamuna Future Park"}
          onChange={handleCheckboxChange}
        />
        <label htmlFor="Jamuna"> Jamuna Future Park</label>
        <br />
      </div>

      <div className="py-1">
        <input
          type="checkbox"
          id="Bashundhara"
          name="Bashundhara"
          value="Bashundhara Shopping Mall"
          checked={selectedCheckbox === "Bashundhara Shopping Mall"}
          onChange={handleCheckboxChange}
        />
        <label htmlFor="Bashundhara"> Bashundhara Shopping Mall</label>
        <br />
      </div>

      <div className="py-1">
        <input
          type="checkbox"
          id="Rapa"
          name="Rapa"
          value="Rapa Plaza"
          checked={selectedCheckbox === "Rapa Plaza"}
          onChange={handleCheckboxChange}
        />
        <label htmlFor="Rapa"> Rapa Plaza</label>
        <br />
      </div>

      <div className="py-1">
        <input
          type="checkbox"
          id="Tokyo"
          name="Tokyo"
          value="Tokyo Plaza"
          checked={selectedCheckbox === "Tokyo Plaza"}
          onChange={handleCheckboxChange}
        />
        <label htmlFor="Tokyo"> Tokyo Plaza</label>
        <br />
      </div>

      <div className="py-1">
        <input
          type="checkbox"
          id="Bangkok"
          name="Bangkok"
          value="Bangkok Plaza"
          checked={selectedCheckbox === "Bangkok Plaza"}
          onChange={handleCheckboxChange}
        />
        <label htmlFor="Bangkok"> Bangkok Plaza</label>
        <br />
      </div>
    </div>
  );
};

export default MallSelection;
