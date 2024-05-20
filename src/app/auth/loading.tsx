import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
export default function Loading() {
  return (
    <Box
      sx={{
        display: 'flex',
        gap: '20px',
        alignItems: 'center',
        height: 'calc(100vh - 250px)',
        justifyContent: 'center',
      }}
    >
      <CircularProgress />
      <div className="text-center text-xl text-black">Loading...</div>;
    </Box>
  );
}
