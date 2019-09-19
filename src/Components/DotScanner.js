import React from "react";
import bwipjs from "bwip-js";
import ScanditBarcodeScanner from "scandit-sdk-react";
import { Barcode, ScanSettings, SymbologySettings } from "scandit-sdk";
import { Dialog, Snackbar, Slide, Button } from "@material-ui/core";
import {
  engineLocation,
  licenseKey,
  errorCode,
  symbologiesList
} from "../configs";

let timeOut = 0;
class DotScanner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: "No data found!",
      scannerReady: false,
      open: false,
      paused: false
    };
  }

  componentDidMount = () => {
    this.setState({
      open: true,
      data: "Scanning..."
    });
  };

  getScanSettings = () => {
    let scanObj = new ScanSettings();
    scanObj.blurryRecognition = true;
    scanObj.setMultipleSymbologiesEnabled(symbologiesList, true);
    scanObj
      .getSymbologySettings(Barcode.Symbology.DOTCODE)
      .setColorInvertedEnabled(true);
    return scanObj;
  };

  handleOnScan = res => {
    if (res) this.setState({ data: res.barcodes[0].data });
    else this.setState({ data: "No data found!" });
  };

  handleProcessFrame = proc => {
    if (proc.barcodes.length) {
      timeOut = 0;
      this.setState({
        open: true
      });
    } else {
      timeOut++;
      if (timeOut === 70) {
        this.setState({
          open: true,
          data: errorCode,
          paused: true
        });
      }
    }
  };

  handleClose = () => {
    timeOut = 0;
    this.setState({
      data: "Scanning...",
      paused: false
    });
  };

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
          paused={this.state.paused}
          visible={true}
          enableTorchToggle={true}
        />
        <Snackbar
          open={this.state.open}
          onClose={this.handleClose}
          ContentProps={{
            "aria-describedby": "message-id"
          }}
          role="error"
          message={<span id="message-id">{this.state.data}</span>}
        />
      </div>
    );
  }
}

export default DotScanner;
