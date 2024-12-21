// components/cards/BirthdayCard.js
const AnniversaryCard = ({ message, images }) => {
    return (
      <div className="bg-yellow-200 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-yellow-800">
          Happy Anniversary!!
        </h2>
        <p className="mt-4 text-xl text-center text-yellow-700">
          {message}
        </p>
        {images.length > 0 && (
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            {images.map((image, index) => (
                           <div key={index} className="relative">
                             <Image
                               src={URL.createObjectURL(image)}
                               alt={`Uploaded Image ${index + 1}`}
                               width={100}
                               height={100}
                               className="rounded-lg"
                             />
                             
                           </div>
                         ))}
          </div>
        )}
      </div>
    );
  };
  
  export default AnniversaryCard;