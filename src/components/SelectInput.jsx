import {BiErrorCircle} from "react-icons/bi";

const SelectInput = ({
  options = [],
  hasLabel,
  value,
  selectStyle,
  labelText,
  width,
  selectName,
  selectError,
  isDisabled,
  updateSelectedValue,
}) => {

  const handleSelectChange = e => {
    updateSelectedValue(e);
  };

  return (
    <>
      {hasLabel && (
        <label htmlFor={labelText} className="block text-gray-700 mb-2">
          {labelText}
        </label>
      )}
      <select
        value={value}
        name={selectName || ""}
        disabled={isDisabled || ""}
        onChange={e => handleSelectChange(e)}
        className={`${
          selectStyle ? selectStyle : ""
        } border border-grey-300 bg-white text-grey-700 text-sm rounded-8px block w-[${
          width ? width : "100%"
        }] py-3 focus:bg-white focus:outline-none focus:border-primary-blue-30 focus:ring-2 focus:shadow-lg focus:ring-[#F4EBFF]`}>
        {isDisabled && (
          <option value="Select a state first!" disabled>
            Select a state first!
          </option>
        )}
        {options.map((option, index) => {
          return (
            <option key={index} value={option.value || option.name || option}>
              {option.value || option.name || option}
            </option>
          );
        })}
      </select>
      {selectError && (
        <p className="flex items-center mt-2 text-sm text-red-600">
          <BiErrorCircle className="mr-2 text-xl" />
          {selectError}
        </p>
      )}
    </>
  );
};

export default SelectInput;