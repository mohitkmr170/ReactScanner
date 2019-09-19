import React from "react";
import bwipjs from "bwip-js";
import ScanditBarcodeScanner from "scandit-sdk-react";
import {
  Barcode,
  BarcodePicker,
  CameraAccess,
  CameraSettings,
  ScanSettings,
  SymbologySettings,
  Camera,
  BrowserCompatibility,
  CustomError
} from "scandit-sdk";

const engineLocation = "https://cdn.jsdelivr.net/npm/scandit-sdk@4.x/build";
const licenseKey =
  "AeN9zl8OQZ7rGTtUQTWc5yIXcjRVLvW9DWqSIHYfMM+8L8WiJ0juJcRtHI2GUJq5kUQAn9cCpXgXXixaAmq5llBOGGOmWZGOM3fagS411ISPQZ/+hiQ2MO9Ez2vrTOtjEc2BsPDm12skZVrOJV6S5bmTQRnPEkcGsnVEfmgP4yw7HiXq7bo6DzPOXpLxxrofqLfmsaOeaCG7OZiPe/nq5cSSwdBWTQeWxXBfy/J6o45NkAmJ/NqOb+t6wvYks1Ak2gFIIFsn7dPGWNSxfyeqIk7ufq5tRHL8Y6Mk2RTYVe4ME094g5h03fLnS6dZxfA8NJrwOv8IDswAo5Lgn5pRZri4JAPrmGpd5E15JBh3f22q2K7lbl/eQVBW1rA6pfM2wKTUsie8YZaqmw9pxGqQl8TdXDwUoWDo+f8Pbj3QKWrebHpXZA+AI2ICyrqmpkWIk5q+mSmUx/SxIWgilREjOrisk8kHcMZdwOBb2UV+POos43t7PJpvcdcBtdptUoKAyPLNpZ4ftJ5MP8lFSH4xYt9eNA0O5Xdfgb0s8QXF5NAr4ej9GeNwR5RAEQ122oHeDdx95kXTPMGZFjrTEgGLnkuOG1qFl+exLIrhfzwx3SoXe6uGNgsphuNUziNAQ7FnqLy9uGCAXWmnnGsgYnOGqq27PbjNl7EFiKa0pb5gyDO9EDuFyNP4jgijxCGcWYsmzSCIuRV3ANG2NBdhrA58fb81Dq89BNwim6M+dCTXqSvYyn1+GxMLeYF4qq1IScc6ln9yDX6Y3nGfyIKnxLJTAKjJyrWeqhPCP1du";
let timeOut = 0;
class DotScanner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: "No data found!",
      scannerReady: false,
      enableTorchToggle: true,
      error: false
    };
  }

  componentDidMount = () => {
    CameraAccess.getCameras()
      .then(res => console.log("camera response", res))
      .catch(err => console.log("camera error", err));
  };

  getScanSettings = () => {
    let scanObj = new ScanSettings();
    scanObj.blurryRecognition = true;
    scanObj.setMultipleSymbologiesEnabled(
      [
        Barcode.Symbology.DOTCODE,
        Barcode.Symbology.CODE128,
        Barcode.Symbology.CODABAR,
        Barcode.Symbology.CODE11,
        Barcode.Symbology.CODE25,
        Barcode.Symbology.CODE32,
        Barcode.Symbology.CODE32,
        Barcode.Symbology.CODE39,
        Barcode.Symbology.CODE93,
        Barcode.Symbology.EAN13,
        Barcode.Symbology.EAN8
      ],
      true
    );
    scanObj
      .getSymbologySettings(Barcode.Symbology.DOTCODE)
      .setColorInvertedEnabled(true);
    return scanObj;
  };

  handleOnScan = res => {
    console.log("scan response", res);
    if (res) this.setState({ data: res.barcodes[0].data });
    else this.setState({ data: "No data found!" });
  };

  handleProcessFrame = proc => {
    if (proc && proc.barcodes.length === 0) {
      timeOut++;
      if (timeOut === 50) {
        alert(
          "Can't scan Image, either symbology not supported or Image not clear!"
        );
        timeOut = 0;
      }
    } else {
      timeOut = 0;
      alert(proc && proc.barcodes[0].data);
    }
    console.log("process", proc);
  };

  getCameraSettings = () => {};

  render() {
    return (
      <div>
        <ScanditBarcodeScanner
          licenseKey={licenseKey}
          engineLocation={engineLocation}
          ready={() =>
            this.setState({ scannerReady: true, data: "No data found!" })
          }
          onScan={res => this.handleOnScan(res)}
          onScanError={err => console.log("error", err)}
          onProcessFrame={proc => this.handleProcessFrame(proc)}
          scanSettings={this.getScanSettings()}
          singleImageMod={true}
          enableTapToFocus={true}
          playSoundOnScan={true}
          paused={false}
          visible={true}
          enableTorchToggle={true}
          cameraSettings={this.getCameraSettings()}
        />
      </div>
    );
  }
}

export default DotScanner;
