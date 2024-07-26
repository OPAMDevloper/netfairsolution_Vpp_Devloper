import React, { useState } from 'react';

const Form = ({ fdata = {}, errors = {} }) => {
  const [formData, setFormData] = useState({
    buyerEmail: fdata.buyerEmail || '',
    buyerPhone: fdata.buyerPhone || '',
    buyerFirstName: fdata.buyerFirstName || '',
    buyerLastName: fdata.buyerLastName || '',
    buyerAddress: fdata.buyerAddress || '',
    buyerCity: fdata.buyerCity || '',
    buyerState: fdata.buyerState || '',
    buyerCountry: fdata.buyerCountry || '',
    buyerPinCode: fdata.buyerPinCode || '',
    orderid: fdata.orderid || '',
    amount: fdata.amount || '',
    customvar: fdata.customvar || '',
    currency: fdata.currency || '356',
    isocurrency: fdata.isocurrency || '',
    txnsubtype: fdata.txnsubtype || ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  return (
    <div className="rside">
      <div className="formwrap container-fluid">
        <form method="POST" action="/sendtoairpay" className="form-horizontal" name="make_trans">
          <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-4">
              <div className="form-group">
                <label htmlFor="buyerEmail">Buyer Email <font className="red">*</font><br/></label>
                <input
                  id="buyerEmail"
                  className="form-control"
                  type="text"
                  name="buyerEmail"
                  value={formData.buyerEmail}
                  onChange={handleChange}
                />
                <font className="red">{errors.buyerEmail || ''}</font>
              </div>
            </div>
            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-4">
              <div className="form-group">
                <label htmlFor="buyerPhone">Buyer Phone <font className="red">*</font><br/></label>
                <input
                  id="buyerPhone"
                  className="form-control"
                  type="text"
                  name="buyerPhone"
                  value={formData.buyerPhone}
                  onChange={handleChange}
                />
                <font className="red">{errors.buyerPhone || ''}</font>
              </div>
            </div>
            <div className="col-md-6 col-lg-4">
              <div className="form-group">
                <label htmlFor="buyerFirstName">Buyer FirstName <font className="red">*</font><br/></label>
                <input
                  id="buyerFirstName"
                  className="form-control"
                  type="text"
                  name="buyerFirstName"
                  value={formData.buyerFirstName}
                  onChange={handleChange}
                />
                <font className="red">{errors.buyerFirstName || ''}</font>
              </div>
            </div>
            <div className="col-md-6 col-lg-4">
              <div className="form-group">
                <label htmlFor="buyerLastName">Buyer LastName <font className="red">*</font><br/></label>
                <input
                  id="buyerLastName"
                  className="form-control"
                  type="text"
                  name="buyerLastName"
                  value={formData.buyerLastName}
                  onChange={handleChange}
                />
                <font className="red">{errors.buyerLastName || ''}</font>
              </div>
            </div>
            <div className="col-md-6 col-lg-4">
              <div className="form-group">
                <label htmlFor="buyerAddress">Buyer Address:<br/></label>
                <input
                  id="buyerAddress"
                  className="form-control"
                  type="text"
                  name="buyerAddress"
                  value={formData.buyerAddress}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="col-md-6 col-lg-4">
              <div className="form-group">
                <label htmlFor="buyerCity">Buyer City:<br/></label>
                <input
                  id="buyerCity"
                  className="form-control"
                  type="text"
                  name="buyerCity"
                  value={formData.buyerCity}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="col-md-6 col-lg-4">
              <div className="form-group">
                <label htmlFor="buyerState">Buyer State:<br/></label>
                <input
                  id="buyerState"
                  className="form-control"
                  type="text"
                  name="buyerState"
                  value={formData.buyerState}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="col-md-6 col-lg-4">
              <div className="form-group">
                <label htmlFor="buyerCountry">Buyer Country:<br/></label>
                <input
                  id="buyerCountry"
                  className="form-control"
                  type="text"
                  name="buyerCountry"
                  value={formData.buyerCountry}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="col-md-6 col-lg-4">
              <div className="form-group">
                <label htmlFor="buyerPinCode">Buyer PinCode:<br/></label>
                <input
                  id="buyerPinCode"
                  className="form-control"
                  type="text"
                  name="buyerPinCode"
                  value={formData.buyerPinCode}
                  onChange={handleChange}
                />
                <font className="red">{errors.buyerPinCode || ''}</font>
              </div>
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col-md-6 col-lg-4">
              <div className="form-group">
                <label htmlFor="orderid">Order ID <font className="red">*</font><br/></label>
                <input
                  id="orderid"
                  className="form-control"
                  type="text"
                  name="orderid"
                  value={formData.orderid}
                  onChange={handleChange}
                />
                <font className="red">{errors.orderid || ''}</font>
              </div>
            </div>
            <div className="col-md-6 col-lg-4">
              <div className="form-group">
                <label htmlFor="amount">Amount <font className="red">*</font><br/></label>
                <input
                  id="amount"
                  className="form-control"
                  type="text"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                />
                <font className="red">{errors.amount || ''}</font>
              </div>
            </div>
            <div className="col-md-6 col-lg-4">
              <div className="form-group">
                <label htmlFor="customvar">Custom Field 1:<br/></label>
                <input
                  id="customvar"
                  className="form-control"
                  type="text"
                  name="customvar"
                  value={formData.customvar}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="col-md-6 col-lg-4">
              <div className="form-group">
                <label htmlFor="currency">Currency <font className="red">*</font><br/></label>
                <input
                  id="currency"
                  className="form-control"
                  type="text"
                  name="currency"
                  value={formData.currency}
                  onChange={handleChange}
                />
                <font className="red">{errors.currency || ''}</font>
              </div>
            </div>
            <div className="col-md-6 col-lg-4">
              <div className="form-group">
                <label htmlFor="isocurrency">ISO Currency <font className="red">*</font><br/></label>
                <input
                  id="isocurrency"
                  className="form-control"
                  type="text"
                  name="isocurrency"
                  value={formData.isocurrency}
                  onChange={handleChange}
                />
                <font className="red">{errors.isocurrency || ''}</font>
              </div>
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col-md-6 col-lg-4">
              <div className="form-group">
                <label htmlFor="txnsubtype">Sub Type:<br/></label>
                <input
                  id="txnsubtype"
                  className="form-control"
                  type="text"
                  name="txnsubtype"
                  value={formData.txnsubtype}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <div className="btngroup">
            <button className="btn btn-primary" type="submit">Pay Here</button>
          </div>
        </form>
      </div>
    </div>
    )}
