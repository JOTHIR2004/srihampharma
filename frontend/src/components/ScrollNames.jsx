export default function ScrollNames(){
    return(
        <div className=" bg-blue-400 h-auto w-full overflow-hidden rounded">
            <ul className="flex gap-10 text-2xl animate-infinite-scroll ">
                {[...indianDoctors, ...indianDoctors].map((doc,index)=>
                <li key={index} className="whitespace-nowrap" >{doc.name}</li>    
            )}
            </ul>

        </div>
    )
}
const indianDoctors = [
  { name: "Dr. Aarav, MBBS" },
  { name: "Dr. Vivaan, MD" },
  { name: "Dr. Aditya, MBBS" },
  { name: "Dr. Sai, BAMS" },
  { name: "Dr. Krishna, MBBS" },
  { name: "Dr. Aryan, MD" },
  { name: "Dr. Rohan, BHMS" },
  { name: "Dr. Karthik, MBBS" },
  { name: "Dr. Vikram, MD" },
  { name: "Dr. Siddharth, BAMS" },
  { name: "Dr. Diya, MBBS" },
  { name: "Dr. Anaya, MD" },
  { name: "Dr. Ishita, BHMS" },
  { name: "Dr. Meera, MBBS" },
  { name: "Dr. Priya, BAMS" },
  { name: "Dr. Sneha, MBBS" },
  { name: "Dr. Lakshmi, MD" },
  { name: "Dr. Pooja, MBBS" },
  { name: "Dr. Divya, BHMS" },
  { name: "Dr. Nandini, BAMS" }
];

