import { Drawer, makeStyles, Typography, List, ListItem, ListItemIcon, ListItemText, AppBar, Toolbar, Avatar } from "@material-ui/core";
import { AddCircleOutline, SubjectOutlined } from "@material-ui/icons";
import React  from "react";
import { useHistory, useLocation } from "react-router-dom";
import {format} from "date-fns"

const drawerWidth = 240

const useStyles = makeStyles((theme) => {
  return {
    page: {
      backgroundColor: '#f9f9f9',
      width: '100%',
      padding: theme.spacing(3) // default spacing is 8 means 8*3=24 pixels
    },
    drawer: {
      width: drawerWidth
    },
    drawerPaper: {
      width: drawerWidth
    },
    root: {
      display: 'flex',
    },
    active: {
      background: '#f4f4f4'
    },
    title: {
      padding: theme.spacing(2)
    },
    appbar: {
      width: `calc(100% - ${drawerWidth}px)`
    },
    toolbar: theme.mixins.toolbar,
    date: {
      flexGrow: 1
    },
    avatar: {
      marginLeft: theme.spacing(2)
    }
  }
});

export default function Layout({ children}) {
  const classes  = useStyles();
  const history = useHistory();
  const location = useLocation();

  const menuItems = [
    {
      title: 'My Notes',
      icon: <SubjectOutlined color="secondary"/>,
      path: "/"
    },
    {
      title: 'Create Note',
      icon: <AddCircleOutline color="secondary"/>,
      path: "/create"
    }
  ]

  return (
    <div className={classes.root}>
      {/* App Bar */}
      <AppBar className={classes.appbar} elevation={0}>
        <Toolbar>
          <Typography className={classes.date}>
            Today is the {format(new Date(), "do MMMM Y")}
          </Typography>
          <Typography>Mario</Typography>
          <Avatar src="/mario-av.png" className={classes.avatar}/>
        </Toolbar>
      </AppBar>

      {/* side drawer */}
      <Drawer
        className={classes.drawer}
        anchor='left'
        variant="permanent"
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <div>
          <Typography
            variant="h6"
            className={classes.title}
          >
            Notes
          </Typography>
        </div>

        {/* List / Link */}

        <List>
          {menuItems.map(item => (
            <ListItem
              button
              key={item.title}
              onClick={() => history.push(item.path) }
              className={location.pathname == item.path ? classes.active : null}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.title} />
            </ListItem>
          ))}
        </List>

      </Drawer>
      <div className={classes.page}>
        <div className={classes.toolbar}></div>
        {children}
      </div>
    </div>
  )
}