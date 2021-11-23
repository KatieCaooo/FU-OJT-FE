import axios from 'axios';
import { BASE_URL, getRequiredAuthenHeaderFormData } from 'src/api/config';
import { attachmentActions } from './attachment-slice';

export const uploadAttachment = (token, payload) => async (dispatch) => {
  const { attachments, page } = payload;

  const sendRequest = async () => {
    const url = `${BASE_URL}/storage`;
    const formData = new FormData();
    for (let index = 0; index < attachments.length; index++) {
      const file = attachments[index];
      formData.append('files', file);
    }
    const response = await axios.post(url,
      formData,
      {
        headers: getRequiredAuthenHeaderFormData(token)
      });
    if (response.status !== 200) {
      throw new Error('Could not upload attachments');
    }

    return response.data;
  };
  try {
    const data = await sendRequest();
    dispatch(attachmentActions.replaceAttachmentList({ attachments: data, page }));
  } catch (error) {
    console.log(console.error());
  }
};

export const getAttachment = () => {};
