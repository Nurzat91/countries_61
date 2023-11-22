import React from 'react';

interface Props{
  name: string;
}
const GetListName: React.FC<Props> = ({name}) => {
  return (
    <div className="row">
      <div className="col-4 text-start">
        <div>{name}</div>
      </div>
    </div>
  );
};

export default GetListName;