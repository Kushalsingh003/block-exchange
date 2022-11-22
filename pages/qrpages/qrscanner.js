import React,{useEffect} from 'react'
import ScanQR from '../../components/qrpages/ScanQR'
import Navigation from '../../components/ui/Navigation'


const qrscanner = () => {

  return (
    <div>


      <Navigation/>
        <ScanQR/>

        
    </div>
  )
}

export default qrscanner;
export  async  function getServerSideProps() {

  console.log("Render")
  return {props:{data:"nothing"}}
}