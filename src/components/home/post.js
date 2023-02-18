/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState} from 'react';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import CardOverflow from '@mui/joy/CardOverflow';
import Link from '@mui/joy/Link';
import IconButton from '@mui/joy/IconButton';
import Input from '@mui/joy/Input';
import Typography from '@mui/joy/Typography';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import ModeCommentOutlined from '@mui/icons-material/ModeCommentOutlined';
import SendOutlined from '@mui/icons-material/SendOutlined';
import Face from '@mui/icons-material/Face';
import BookmarkBorderRoundedIcon from '@mui/icons-material/BookmarkBorderRounded';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import axios from "axios";
import cookie from 'react-cookies'
import AlertDialog from '../common/confirmationDialog';
import FormDialog from '../common/formDialog';





export default function Post({ post, handleDeletePost,editPostsChange }) {
    const [show, setShow] = useState(false)
    const [postComments, setPostComments] = useState([])
    const posts = useState(post);
    const [confirm, setConfirm] = useState(false)
    const [showDialog, setShowDialog] = useState(false);


    const handleDelete = async () => {
        console.log("DELETE");
        await axios.delete(`https://jsonplaceholder.typicode.com/posts/${post.id}`)
            .then(function (response) {
                handleDeletePost(post.id)
            }).catch(function (error) {

                console.log(error);
            });
    }

    const handleComments = async () => {
        setShow(!show);
        if (!show) {
            await axios.get(`https://jsonplaceholder.typicode.com/comments?postId=${post.id}`)

                .then(function (response) {
                    setPostComments(response.data)

                }).catch(function (error) {

                    console.log(error);
                });
        }


    }

    return (
        <>
            <Card
                variant="outlined"
                sx={{
                    minWidth: 300,
                    '--Card-radius': (theme) => theme.vars.radius.xs,
                    marginBottom: 1
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center', pb: 1.5, gap: 1 }}>
                    <Box
                        sx={{
                            position: 'relative',
                            '&:before': {
                                content: '""',
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                bottom: 0,
                                right: 0,
                                m: '-2px',
                                borderRadius: '50%',
                                background:
                                    'lightblue',
                            },
                        }}
                    >
                        <Avatar color="success" variant="outlined" />
                    </Box>
                    <Typography fontWeight="lg">MUI</Typography>
                    {post.userId === cookie.load('data').id &&
                        <IconButton variant="plain" color="neutral" size="sm" sx={{ ml: 'auto' }}>
                            <DeleteIcon onClick={() => { setConfirm(true) }}></DeleteIcon>
                            <EditIcon onClick={() => { setShowDialog(true) }}></EditIcon>
                        </IconButton>
                    }

                </Box>
                <CardOverflow>

                </CardOverflow>
                <Box sx={{ display: 'flex', alignItems: 'center', mx: -1, my: 1 }}>
                    <Box sx={{ width: 0, display: 'flex', gap: 0.5 }}>
                        <IconButton variant="plain" color="neutral" size="sm">
                            <FavoriteBorder />
                        </IconButton>
                        <IconButton variant="plain" color="neutral" size="sm">
                            <ModeCommentOutlined />
                        </IconButton>
                        <IconButton variant="plain" color="neutral" size="sm">
                            <SendOutlined />
                        </IconButton>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mx: 'auto' }}>

                    </Box>
                    <Box sx={{ width: 0, display: 'flex', flexDirection: 'row-reverse' }}>
                        <IconButton variant="plain" color="neutral" size="sm">
                            <BookmarkBorderRoundedIcon />
                        </IconButton>
                    </Box>
                </Box>
                <Link
                    component="button"
                    underline="none"
                    fontSize="sm"
                    fontWeight="lg"
                    textColor="text.primary"
                >
                    {post.title}
                </Link>
                <Typography fontSize="sm">

                    {post.body}
                </Typography>

                <Link
                    component="button"
                    underline="none"
                    fontSize="10px"
                    sx={{ color: 'text.tertiary', my: 0.5 }}
                >
                    2 DAYS AGO
                </Link>
                {show &&
                    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                        {postComments.map((item) => {
                            return (
                                item.postId === post.id &&
                                <div key={item.id}>
                                    <ListItem alignItems="flex-start">
                                        <ListItemAvatar>
                                            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={item.name}
                                            secondary={
                                                <React.Fragment>
                                                    <Typography
                                                        sx={{ display: 'inline', color: 'blue' }}
                                                        component="span"
                                                        variant="body2"

                                                    >
                                                        <b> {item.email.split('@')[0]}</b>
                                                    </Typography>
                                                    __{item.body}
                                                </React.Fragment>
                                            }
                                        />
                                    </ListItem>
                                    <Divider variant="inset" component="li" />
                                </div>)

                        })}


                    </List>
                }
                <Button variant="outlined" onClick={() => handleComments()}>{!show ? 'Load comments' : 'Hide'}</Button>

                <CardOverflow sx={{ p: 'var(--Card-padding)', display: 'flex' }}>
                    <IconButton size="sm" variant="plain" color="neutral" sx={{ ml: -1 }}>
                        <Face />
                    </IconButton>
                    <Input
                        variant="plain"
                        size="sm"
                        placeholder="Add a comment…"
                        sx={{ flexGrow: 1, mr: 1, '--Input-focusedThickness': '0px' }}
                    />
                    <Link disabled underline="none" role="button">
                        Post
                    </Link>
                </CardOverflow>
            </Card>
            {confirm &&
                <AlertDialog setConfirm={setConfirm} handleDelete={handleDelete}></AlertDialog>
            }
            {showDialog &&
                <FormDialog setShowDialog={setShowDialog} previosTitle={posts.title} previosBody={posts.body} editPostsChange={editPostsChange} onePost={post}></FormDialog>
            }
        </>
    );
}
