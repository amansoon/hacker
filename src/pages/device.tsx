import React, { useEffect } from "react";
import ip from 'ip'


type Props = {};

function Divice({}: Props) {
  useEffect(() => {
    console.log(ip.address())
  }, []);

  return <div>Ip Address :  </div>;
}

export default Divice;
