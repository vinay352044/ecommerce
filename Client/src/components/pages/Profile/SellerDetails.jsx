import { IoIosMail } from "react-icons/io";

const SellerDetails = ({ labelClass , seller, readOnly, handleChange, inputClass }) => {
  return (
    <>
      <div className="flex items-center">
        <label htmlFor="email" className={labelClass}>
          <IoIosMail /> :
        </label>
        <input
          type="text"
          name="businessName"
          value={seller?.businessName}
          readOnly={readOnly}
          onChange={handleChange}
          className={inputClass}
        />
      </div>
      <div className="flex items-center">
        <label htmlFor="email" className={labelClass}>
          <IoIosMail /> :
        </label>
        <input
          type="text"
          name="gstin"
          value={seller?.gstin}
          readOnly={true}
          onChange={handleChange}
          className={inputClass}
        />
      </div>
    </>
  );
};

export default SellerDetails;
