import React from 'react';
import { Oval } from 'react-loader-spinner';

export default function Loader({ isLoading }){
    return (
        <>
          {isLoading === true && (
            <Oval
              height={100}
              width={100}
              radius={9}
              color="brown"
              ariaLabel="oval-loading"
              wrapperStyle={{
                position: "fixed",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                zIndex: 9999,
                borderRadius: "15px"
              }}
              wrapperClassName="loader"
            />
          )}
        </>
    );
}