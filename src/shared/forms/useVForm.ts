import { FormHandles } from "@unform/core";
import React from "react";

export const useVForm = () => {
  const formRef = React.useRef<FormHandles>(null);

  const isSavingAndNew = React.useRef(false);
  const isSavingAndClose = React.useRef(false);

  const handleSave = React.useCallback(() => {
    isSavingAndClose.current = false;
    isSavingAndNew.current = false;
    formRef.current?.submitForm();
  }, []);

  const handleSaveAndNew = React.useCallback(() => {
    isSavingAndNew.current = true;
    isSavingAndClose.current = false;
    formRef.current?.submitForm();
  }, []);

  const handleSaveAndClose = React.useCallback(() => {
    isSavingAndNew.current = false;
    isSavingAndClose.current = true;
    formRef.current?.submitForm();
  }, []);

  const handleIsSaveAndNew = React.useCallback(() => {
    return isSavingAndNew.current;
  }, []);

  const handleIsSaveAndClose = React.useCallback(() => {
    return isSavingAndClose.current;
  }, []);

  return {
    formRef,
    save: handleSave,
    saveAndNew: handleSaveAndNew,
    saveAndClose: handleSaveAndClose,
    isSaveAndNew: handleIsSaveAndNew,
    isSaveAndClose: handleIsSaveAndClose,
  };
};
