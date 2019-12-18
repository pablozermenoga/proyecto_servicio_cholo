import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

@Component({
  selector: 'app-qr',
  templateUrl: './qr.page.html',
  styleUrls: ['./qr.page.scss'],
})
//anulada
export class QrPage implements OnInit {
  qrData = null;
  createdCode = null;
  scannedCode = null;
  constructor( private barcodeScanner: BarcodeScanner) { }

  ngOnInit() {}

  createCode() {
      this.createdCode = this.qrData;
  }

  scanCode() {
      this.barcodeScanner.scan().then(barcodeData => {
        this.scannedCode = barcodeData.text;
    });
  }

}
