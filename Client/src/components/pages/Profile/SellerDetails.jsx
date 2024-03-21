import { FaShop } from "react-icons/fa6";
import { MdConfirmationNumber} from "react-icons/md";

const SellerDetails = ({
  seller,
  readOnly,
  handleChange,
  infoWrapperClass,
}) => {
  const labelClass =
    "mr-2 font-bold md:text-2xl text-[#2590db] flex items-center gap-2";
  const inputClass = `px-3 py-1 w-full md:w-[85%] text-lg md:text-xl font-medium border-none bg-transparent focus:outline-none`;
  return (
    <>
      <div className={`${infoWrapperClass}  w-full`}>
        <label htmlFor="email" className={labelClass}>
          <FaShop /> :
        </label>
        <input
          type="text"
          name="businessName"
          value={seller?.businessName}
          readOnly={readOnly}
          onChange={handleChange}
          className={`${inputClass}`}
          required
        />
      </div>
      <div className={`${infoWrapperClass} border-gray-400`}>
        <label htmlFor="email" className={`${labelClass}`}>
          <MdConfirmationNumber /> :
        </label>
        <input
          type="text"
          name="gstin"
          value={seller?.gstin}
          readOnly={true}
          onChange={handleChange}
          className={`${inputClass} w-[65%!important]`}
        />
      </div>
    </>
  );
};

export default SellerDetails;
