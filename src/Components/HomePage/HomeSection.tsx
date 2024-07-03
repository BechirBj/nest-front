import React, { useState } from 'react'
import api from '../../API/api';
import APIS from '../../API/endPoints';

const HomeSection = () => {
    function test(): void {
        const jsonInput = (document.getElementById('json-input') as HTMLInputElement).value;
        try {
          const jsonData = JSON.parse(jsonInput);
          console.log("jsonData" + JSON.stringify(jsonData));
          const typescriptOutput = generateTypeScript(jsonData);
          console.log("typescriptOutput" + JSON.stringify(typescriptOutput));
          setContent(typescriptOutput); 
          (document.getElementById('typescript-output') as HTMLInputElement).value = typescriptOutput;
        } catch (error) {
          console.error('Error parsing JSON:', error);
          (document.getElementById('typescript-output') as HTMLInputElement).value = 'Error parsing JSON. Please check the input.';
        }



    }
      
      function generateTypeScript(data: any): string {
        let typescript = '';
      
        function generateTypeScriptRecursive(obj: any): void {
          for (const key in obj) {
            const value = obj[key];
            const propertyName = `${key}`;
      
            if (typeof value === 'object' && value !== null) {
              if (Array.isArray(value)) {
                typescript += `${propertyName}: ${value.length > 0 ? generateTypeScriptType(value[0]) : 'any'}[];\n`;
              } else {
                typescript += `${propertyName}: {\n`;
                generateTypeScriptRecursive(value);
                typescript += '};\n';
              }
            } else {
              typescript += `${propertyName}: ${generateTypeScriptType(value)};\n`;
            }
          }
        }
      
        function generateTypeScriptType(value: any): string {
          switch (typeof value) {
            case 'string':
              return 'string';
            case 'number':
              return 'number';
            case 'boolean':
              return 'boolean';
            case 'object':
              if (value === null) {
                return 'any';
              } else if (Array.isArray(value)) {
                return 'any[]';
              } else {
                return 'any';
              }
            default:
              return 'any';
          }
        }
      
        const copyButton = document.querySelector('.copy-button') as HTMLButtonElement;
      
        copyButton.addEventListener('click', () => {
          navigator.clipboard.writeText(copiedText).then(() => {
            copyButton.textContent = 'Copied!';
            setTimeout(() => {
              copyButton.textContent = 'Copy';
            }, 2000);
          });
        });
      
        generateTypeScriptRecursive(data);
        const copiedText = `export interface { \n${typescript}}`;
      
        return `export interface { \n${typescript}}`;
    }
      

    const [title,setTitle]= useState('')
    const [content,setContent]= useState('')
    const [data,setData]= useState('')
    const [error, setError] = useState<string | null>(null);


    const Save = async (event: { preventDefault: () => void }) => {
      const token = localStorage.getItem('token');
      if (!token) {
          setError('No token found');
          return;
      }
      event.preventDefault();
      const form = {
          title: title,
          content: content,
      };
      console.log('Form data:', form);
  
      try {
          const response = await api.post(APIS.CREATE_INTERFACE, form, {
              headers: {
                  Authorization: `Bearer ${token}`,
              },
          });
          if (response.status === 201) { 
              setData(response.data);
          } else {
              setError('Failed to create interface');
          }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
  };
      return (
        <div className="h-full font-poppins bg-gradient-to-r from-purple-700 to-indigo-900 text-white ">
            <div className='flex justify-center pt-16'>         
            <input
            onChange={(e)=>setTitle(e.target.value)}
                type="text"
                placeholder="Enter Interface Title"
                className=" w-50 h-50 text-center px-3 py-2 mb-4  rounded-md  text-black "
            />
            </div>
            <div className='mt-10 ml-4'>

          <h1 className='text-xl mb-3' >JSON to TypeScript Converter</h1>
          <p className='text-xl mb-3'> Enter your JSON code in the left textarea, then click the "Convert to TypeScript" button.</p>
            </div>
          <div className="m-10 container grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto">
            <div className=''>
              <h2 className='text-xl mb-3'>JSON Input</h2>
              <textarea
                className=" w-full h-44 p-5 box-border border-none rounded-lg shadow-md bg-gray-100 resize-none text-gray-800 font-poppins"
                id="json-input"
                placeholder="Enter your JSON code here..."
              ></textarea>
            </div>
            <div>
              <h2 className='text-xl mb-3'>TypeScript Output</h2>
              <div className=" flex flex-col-reverse items-start justify-end space-between">
                <button className="copy-button self-end flex items-center justify-center bg-blue-500 text-white border-none rounded-md py-2 px-3 cursor-pointer transition duration-300 ease absolute m-auto hover:bg-blue-700">
                  <div className="iii flex items-center">
                    <svg
                      data-icon="duplicate"
                      viewBox="0 0 16 16"
                      className="w-5 h-5 mr-2"
                    >
                      <path
                        d="M15 0H5c-.55 0-1 .45-1 1v2h2V2h8v7h-1v2h2c.55 0 1-.45 1-1V1c0-.55-.45-1-1-1zm-4 4H1c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h10c.55 0 1-.45 1-1V5c0-.55-.45-1-1-1zm-1 10H2V6h8v8z"
                        fillRule="evenodd"
                      ></path>
                    </svg>
                    Copy
                  </div>
                </button>
                <textarea
                  className="qq w-full h-44 p-5 box-border border-none rounded-lg shadow-md bg-gray-100 resize-none text-gray-800 font-poppins"
                  id="typescript-output"
                ></textarea>
              </div>
            </div>
          </div>
          <div className='flex  justify-between'>
            <button
              onClick={test}
              className="m-10 py-3 px-7 text-lg bg-gradient-to-r from-purple-400 to-purple-600 text-white border-none rounded-lg cursor-pointer transform transition-transform duration-300 ease hover:translate-y-[-3px] shadow-md"
              >
              Convert JSON to TypeScript
            </button>
            <button
              onClick={Save}
              className="m-10 py-3 px-7 text-lg bg-gradient-to-r from-purple-400 to-purple-600 text-white border-none rounded-lg cursor-pointer transform transition-transform duration-300 ease hover:translate-y-[-3px] shadow-md"
              >
              Save
            </button>
          </div>
        </div>
      );
      
}

export default HomeSection
