import { useEffect } from "react";
import styled from "styled-components";

function EditModal() {
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return <div>EditModal</div>;
}

export default EditModal;
