import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import styled from 'styled-components';
import { useCallback, useState } from 'react';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import {
  Button,
  TextField,
  FormControlLabel,
  Stack,
  Grid,
  Typography,
  IconButton,
  Card,
} from '@mui/material';
import { DEFAULT_SUB_CAMPAIGN } from 'const';
import { themes } from 'styles/themes';
import {
  AdsEntry,
  FormSubCampaignEntry,
  SubCampaignEntry,
} from 'interface/demo';

const FormSubCampaign = ({ formik }: any) => {
  const [indexCurrent, setIndexCurrent] = useState(0);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedItems, setSelectedItems] = useState([] as number[]);
  const [subCampaign, setSubCampaign] =
    useState<SubCampaignEntry[]>(DEFAULT_SUB_CAMPAIGN);

  const handleAddSubCampaign = () => {
    setSubCampaign((prev: SubCampaignEntry[]) => {
      const count = subCampaign.length + 1;
      const newData = {
        id: count,
        name: 'Chiến dịch con ' + count,
        count: count,
        quantity: 1,
        status: true,
        checked: true,
        ads: [
          {
            name: 'Quảng cáo 1',
            quantity: 1,
            id: Date.now(),
          },
        ],
      };
      const newIndexCurrent = prev?.length;
      setIndexCurrent(newIndexCurrent);
      setSelectAll(false);
      setSelectedItems([]);
      formik.setFieldValue('subCampaign', [...prev, newData]);
      return [...prev, newData];
    });
  };

  const handleClick = useCallback(
    (item: FormSubCampaignEntry, index: number) => {
      setIndexCurrent(index);
      setSelectAll(false);
      setSelectedItems([]);
    },
    [],
  );

  const handleAddData = () => {
    const newArray = [...subCampaign];
    const count = Number(newArray[indexCurrent].ads.length) + 1;
    const newItem = {
      name: 'Quảng cáo' + ' ' + count,
      quantity: 0,
      id: Date.now(),
      nameError: false,
      nameHelperText: '',
      quantityError: false,
      quantityHelperText: '',
    };

    if (newItem.quantity === 0) {
      newItem.quantityError = true;
      newItem.quantityHelperText = 'Số lượng phải lớn hơn 0';
    }

    newArray[indexCurrent].ads.push(newItem);
    setSubCampaign(newArray);
  };

  function isValidName(name: string) {
    if (!name || name.trim() === '') {
      return false;
    }
    return true;
  }

  const handleNameChange = (id: number, newData: string, index: number) => {
    setIndexCurrent(index);
    const newArray = [...subCampaign];
    const targetSubCampaign = newArray[index];
    if (targetSubCampaign) {
      const updatedAds = targetSubCampaign.ads.map((item: AdsEntry) => {
        if (item.id === id) {
          if (isValidName(newData)) {
            item.nameError = false;
            item.nameHelperText = '';
          } else {
            item.nameError = true;
            item.nameHelperText = 'Tên không hợp lệ';
          }
          return { ...item, name: newData };
        }
        return item;
      });
      targetSubCampaign.ads = updatedAds;
      formik.setFieldValue('subCampaign', newArray);
      setSubCampaign(newArray);
    }
  };

  const handleQuantityChange = (id: number, newData: number, index: number) => {
    setIndexCurrent(index);
    const newArray = [...subCampaign];
    const targetSubCampaign = newArray[index];
    if (targetSubCampaign) {
      const updatedAds = targetSubCampaign.ads.map((item: AdsEntry) => {
        if (item.id === id) {
          if (newData > 0) {
            item.quantityError = false;
            item.quantityHelperText = '';
          } else {
            item.quantityError = true;
            item.quantityHelperText = 'Số lượng phải lớn hơn 0';
          }
          return { ...item, quantity: newData };
        }
        return item;
      });
      targetSubCampaign.ads = updatedAds;
      formik.setFieldValue('subCampaign', newArray);
      setSubCampaign(newArray);
    }
  };

  const handleDeleteData = (id: number, index: number) => {
    const newArray = [...subCampaign];

    const targetSubCampaign = newArray[index];

    if (targetSubCampaign) {
      targetSubCampaign.ads = targetSubCampaign.ads.filter(
        (item: any) => item.id !== id,
      );

      setSubCampaign(newArray);
    }
  };

  const isItemChecked = (itemId: number) => selectedItems.includes(itemId);
  const isAtLeastOneItemChecked = selectedItems.length > 0;

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectAll(event.target.checked);
    if (event.target.checked) {
      const selectedIds = subCampaign[indexCurrent].ads.map(
        (item: AdsEntry) => item.id,
      );
      setSelectedItems(selectedIds);
    } else {
      setSelectedItems([]);
    }
  };
  const handleItemSelect = (itemId: number) => {
    const newArray = [...selectedItems];

    if (newArray.includes(itemId)) {
      const updatedSelectedItems = newArray.filter((id) => id !== itemId);
      setSelectedItems(updatedSelectedItems);

      setSelectAll(
        subCampaign[indexCurrent].ads.every((item: AdsEntry) =>
          updatedSelectedItems.includes(item.id),
        ),
      );
    } else {
      newArray.push(itemId);
      setSelectedItems(newArray);

      setSelectAll(
        subCampaign[indexCurrent].ads.every((item: AdsEntry) =>
          newArray.includes(item.id),
        ),
      );
    }
  };
  const handleDeleteSelected = () => {
    const newArray = [...subCampaign];
    const targetSubCampaign = newArray[indexCurrent];
    if (targetSubCampaign) {
      targetSubCampaign.ads = targetSubCampaign.ads.filter(
        (item: AdsEntry) => !selectedItems.includes(item.id),
      );
      setSubCampaign(newArray);
      setSelectedItems([]);
    }
  };
  const calculateTotalQuantity = (index: number) => {
    const ads = subCampaign[index]?.ads;
    console.log(ads, 'ads');

    if (ads) {
      return ads.reduce((total, ad) => {
        if (ad.quantity) {
          return total + ad.quantity;
        } else {
          return total;
        }
      }, 0);
    }
    return 0;
  };

  return (
    <>
      <Stack gap={4}>
        <Stack width="100%" alignItems="flex-start" direction="row" gap={2}>
          <IconButton
            onClick={handleAddSubCampaign}
            sx={{ flexShrink: 0 }}
            color="secondary"
            aria-label="add"
          >
            <AddIcon />
          </IconButton>

          <Stack flex={1} direction="row" gap={2} flexWrap="wrap">
            {subCampaign?.map((item: FormSubCampaignEntry, index: number) => {
              return (
                <>
                  <Card
                    onClick={() => handleClick(item, index)}
                    sx={{
                      cursor: 'pointer',
                      p: 3,
                      border:
                        index === indexCurrent
                          ? `2px solid ${themes.color.primary}`
                          : 'none',
                    }}
                    key={item.id}
                  >
                    <Stack gap={1} alignItems="center">
                      <Stack direction="row" alignItems="center" gap={1}>
                        <Typography fontWeight={'500'} variant="h5">
                          {item.name}
                        </Typography>
                        {item.status ? (
                          <CheckCircleIcon fontSize="small" color="success" />
                        ) : (
                          <CancelIcon fontSize="small" color="error" />
                        )}
                      </Stack>
                      <Typography variant="h5">
                        {calculateTotalQuantity(index)}
                      </Typography>
                    </Stack>
                  </Card>
                </>
              );
            })}
          </Stack>
        </Stack>
        <RowFlex>
          <Stack gap={5}>
            <Grid container spacing={2}>
              <Grid item xs={8}>
                <TextField
                  fullWidth
                  variant="standard"
                  label="Tên chiến dịch con *"
                  value={subCampaign[indexCurrent]?.name}
                  onChange={(e) => {
                    const updatedSubCampaign = [...subCampaign];
                    updatedSubCampaign[indexCurrent].name = e.target.value;
                    formik.setFieldValue('subCampaign', updatedSubCampaign);
                  }}
                  error={
                    formik.touched.subCampaign &&
                    formik.touched.subCampaign[indexCurrent]?.name &&
                    Boolean(formik.errors.subCampaign) &&
                    Boolean(formik.errors.subCampaign[indexCurrent]?.name)
                  }
                  helperText={
                    formik.touched.subCampaign &&
                    formik.touched.subCampaign[indexCurrent]?.name &&
                    formik.errors.subCampaign &&
                    formik.errors.subCampaign[indexCurrent]?.name
                  }
                />
              </Grid>
              <Grid item xs={4}>
                <Stack alignItems="center">
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={
                          formik.values.subCampaign[indexCurrent]?.status
                        }
                        name="status"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          const updatedSubCampaign = [...subCampaign];
                          updatedSubCampaign[indexCurrent].status =
                            e.target.checked;
                          formik.setFieldValue(
                            'subCampaign',
                            updatedSubCampaign,
                          );
                        }}
                      />
                    }
                    label="Đang hoạt động"
                  />
                </Stack>
              </Grid>
            </Grid>
          </Stack>
        </RowFlex>

        <Typography variant="h5" fontWeight="500" textTransform="uppercase">
          Danh sách quảng cáo
        </Typography>
        <Box>
          <Stack direction="row" alignItems="center" gap={3}>
            <Checkbox checked={selectAll} onChange={handleSelectAll} />
            <Typography sx={{ flex: 1 }}>
              {!isAtLeastOneItemChecked ? (
                <>Tên quảng cáo</>
              ) : (
                <>
                  <IconButton onClick={() => handleDeleteSelected()}>
                    <DeleteIcon />
                  </IconButton>
                </>
              )}
            </Typography>
            <Typography sx={{ flex: 1 }}>
              {!isAtLeastOneItemChecked && 'Số lượng *'}
            </Typography>
            <Button
              onClick={handleAddData}
              startIcon={<AddIcon />}
              variant="outlined"
            >
              Thêm
            </Button>
          </Stack>
        </Box>
        {subCampaign &&
          subCampaign.length > 0 &&
          subCampaign[indexCurrent].ads.length > 0 &&
          subCampaign[indexCurrent].ads.map((item: AdsEntry) => (
            <>
              <Stack key={item.id} direction="row" alignItems="center" gap={3}>
                <Checkbox
                  checked={isItemChecked(item.id)}
                  onChange={() => handleItemSelect(item.id)}
                />
                <TextField
                  type="text"
                  fullWidth
                  value={item?.name ?? ''}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleNameChange(item.id, e.target.value, indexCurrent)
                  }
                  error={item.nameError}
                  helperText={item.nameHelperText}
                  style={{
                    borderColor: item.nameError ? 'red' : 'initial',
                  }}
                />
                <TextField
                  fullWidth
                  type="number"
                  value={item?.quantity ?? 0}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleQuantityChange(
                      item.id,
                      parseInt(e.target.value),
                      indexCurrent,
                    )
                  }
                  error={item.quantityError}
                  helperText={item.quantityHelperText}
                  style={{
                    borderColor: item.quantityError ? 'red' : 'initial',
                  }}
                />
                <IconButton
                  onClick={() => handleDeleteData(item.id, indexCurrent)}
                >
                  <DeleteIcon />
                </IconButton>
              </Stack>
            </>
          ))}
      </Stack>
    </>
  );
};
export default FormSubCampaign;

const RowFlex = styled.div`
  width: 100%;
  margin: 20px 0;
`;
