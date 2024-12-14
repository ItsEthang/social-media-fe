import Box from '@mui/joy/Box';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import Breadcrumbs from '@mui/joy/Breadcrumbs';
import Link from '@mui/joy/Link';

import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import Post from '../components/Post';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { PostType } from '../util/types';
import { useEffect } from 'react';
import { getPosts } from '../features/post/postSlice';

export default function Posts() {

    const postStore = useAppSelector((store) => store.post);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getPosts());
        console.log(postStore.posts)
    }, []);


    console.log(postStore.posts)

    return (
        <Box sx={{ flex: 1, width: '100%' }}>
            <Box
                sx={{
                    position: 'sticky',
                    top: { sm: -100, md: -110 },
                    bgcolor: 'background.body',
                    zIndex: 9995,
                }}
            >
                <Box sx={{ px: { xs: 2, md: 6 } }}>
                    <Breadcrumbs
                        size="sm"
                        aria-label="breadcrumbs"
                        separator={<ChevronRightRoundedIcon />}
                        sx={{ pl: 0 }}
                    >
                        <Link
                            underline="none"
                            color="neutral"
                            href="#some-link"
                            aria-label="Home"
                        >
                            <HomeRoundedIcon />
                        </Link>
                        <Typography color="primary" sx={{ fontWeight: 500, fontSize: 12 }}>
                            My profile
                        </Typography>
                    </Breadcrumbs>
                    <Typography level="h2" component="h1" sx={{ mt: 1, mb: 2 }}>
                        For You
                    </Typography>
                </Box>
            </Box>
            <Stack
                spacing={4}
                sx={{
                    display: 'flex',
                    maxWidth: '800px',
                    mx: 'auto',
                    px: { xs: 2, md: 6 },
                    py: { xs: 2, md: 3 },
                }}
            >
                {
                    postStore.isLoading ?
                        <></> :
                        (
                            postStore.posts.map((post: PostType) => {
                                return <Post key={post.id} post={post} />;
                            }
                            )
                        )
                }


            </Stack>

        </Box>
    )
}