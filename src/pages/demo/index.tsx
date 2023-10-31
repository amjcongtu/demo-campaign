import { memo, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Button,
  Card,
  Container,
  Divider,
  Stack,
  Tab,
  Tabs,
  TextField,
} from '@mui/material';
import Box from '@mui/material/Box';
import styled from '@emotion/styled';
import FormSubCampaign from './FormSubCampaign';
import { DEFAULT_CAMPAIGN } from 'const';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Trường này không được để trống'),
  describe: Yup.string(),
  subCampaign: Yup.array().of(
    Yup.object().shape({
      name: Yup.string().required('Trường này không được để trống'), 
      status: Yup.boolean(),
      ads: Yup.array().of(
        Yup.object().shape({
          name: Yup.string().required('Trường này không được để trống'), 
          quantity: Yup.number(),
        }),
      ),
    }),
  ),
});
const Demo = () => {
  const [currentTab, setCurrentTab] = useState<number>(0);
  const formik: any = useFormik({
    initialValues: DEFAULT_CAMPAIGN,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const obj = {
        campaign: {
          information: {
            name: values.name,
            describe: values.describe,
          },
          subCampaign: values.subCampaign,
        },
      };
      console.log(obj,'obj add');
      
      alert(JSON.stringify(obj));
    },
  });

  const handleChangeTab = (e: any, newValue: number) => {
    setCurrentTab(newValue);
  };

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <Container maxWidth="xl">
          <Stack py={2} justifyContent="end" direction="row">
            <Button variant="contained" type="submit">
              Submit
            </Button>
          </Stack>
        </Container>
        <Divider />
        <Container maxWidth="xl">
          <Card>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={currentTab} onChange={handleChangeTab}>
                <Tab label="Thông tin" value={0} />
                <Tab label="Chiến dịch con" value={1} />
              </Tabs>
            </Box>
            <RowFullWidth hidden={currentTab !== 0}>
              <Row>
                <TextField
                  fullWidth
                  name="name"
                  variant="standard"
                  label="Tên chiến dịch"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
                />
              </Row>
              <Row>
                <TextField
                  fullWidth
                  name="describe"
                  variant="standard"
                  label="Mô tả"
                  value={formik.values.describe}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.describe && Boolean(formik.errors.describe)
                  }
                  helperText={formik.touched.describe && formik.errors.describe}
                />
              </Row>
            </RowFullWidth>

            <RowFullWidth role="tabpanel" hidden={currentTab !== 1}>
              <FormSubCampaign formik={formik} />
            </RowFullWidth>
          </Card>
        </Container>
      </form>
    </>
  );
};
export default memo(Demo);

const Row = styled.div`
  margin: 20px 0;
`;
const RowFullWidth = styled.div`
  width: 100%;
  padding: 20px;
`;
