import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import useStoreon from 'storeon/react';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
    rootCount: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(0.5)
        }
    },
    root: {
        minWidth: 275,
        marginBottom: '1em'
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)'
    },
    title: {
        fontSize: 14
    },
    pos: {
        marginBottom: 12
    }
}));

const RssListPage = () => {
    const { stats, posts, loading, dispatch } = useStoreon(
        'stats',
        'posts',
        'loading'
    );
    const isLoading = loading.includes('FEED');
    const classes = useStyles();

    useEffect(() => {
        if (!isLoading && !stats.length && !posts.length) {
            dispatch('posts/get');
        }
    }, []);

    if (isLoading) {
        return <p>loading...</p>;
    }

    const PostCard = props => {
        const classes = useStyles();
        const { title, summary, pubDate, link, author } = props;
        const stripTags = (string) => string.replace(/<[^>]+>/gm, "");

        return (
          <Card className={classes.root} variant="outlined">
            <CardContent>
            <Typography variant="h5" component="h2">
                {stripTags(title)}
              </Typography>
              <Typography className={classes.title} color="textSecondary" gutterBottom>
                {author}
                {' '}
                {pubDate}
              </Typography>
              <Typography variant="body2" component="p">
                {stripTags(summary)}
              </Typography>
            </CardContent>
            <CardActions>
              <Link href={link} target="_blank">Read more</Link>
            </CardActions>
          </Card>
        );
    };

    return (
        <Container component="main">
            <h3>RSS List</h3>
            <h4>Top 10 words</h4>
            <div className={classes.rootCount}>
                {stats &&
                    stats.map(({ word, count }) => (
                        <Chip
                            key={word}
                            size="small"
                            avatar={<Avatar>{count}</Avatar>}
                            label={word}
                            clickable
                            color="primary"
                        />
                    ))}
            </div>
            <h4>Latest Articles</h4>
            {posts &&posts.map(post => <PostCard key={post.id} {...post} /> )}
        </Container>
    );
};

export default RssListPage;
