import { StyleSheet, View, useWindowDimensions } from 'react-native';

import { TicketsMainPage } from '@/components/layout/tickets-main-page';

import { getAllTickets } from "@/api/ticketApi";
import { Ticket } from "@/components/layout/types";
import { useEffect, useState } from 'react';

import { MainContent } from '@/components/layout/main-content';
import { useAuth } from "react-oidc-context";

export default function TicketsScreen() {
  let pageCode = "tickets";
  let auth = useAuth();
  const { width } = useWindowDimensions();
  const isCompact = width < 960;
  const [action, setAction] = useState("showAll");
  const title = "Tickets";
  const subtitle = "Track, open, and organize support tickets from a single workspace.";
  const actions = ['Show All', 'Create',]//'Assign', 'Update Status'];

  const links = {
    'Show All': "showAll",
    'Create': "create",
    // 'Assign': "/ticket/{id}/assign",
    // 'Update Status': "ticket/{id}/update"
  }


  //Load all tickets
  const [tickets, setTickets] = useState<Ticket[]>([]);

  useEffect(() => {
    try {
      const fetchTickets = async () => {
        const response = await getAllTickets();
        setTickets(response);
      };
      fetchTickets();
    } catch (error) {
      console.log(error);
    }
  }, [tickets]);

  return (
    <View style={styles.page}>
      <View style={[styles.mainRow, isCompact && styles.mainRowCompact]}>
        {
          auth.isAuthenticated ? <View style={styles.page}>
            <TicketsMainPage
              title={title}
              subtitle={subtitle}
              actions={actions}
              tickets={tickets}
              compact={isCompact}
              links={links}
              action={action}
              setAction={setAction}
            />
          </View>
            : <MainContent title={"You do not have enough permissions"} subtitle={"Please, log in with user with permisions needed."} />
        }
      </View>
    </View>
  );
}



const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#dddddd',
    paddingHorizontal: 26,
    paddingTop: 22,
    paddingBottom: 24,
  },
  mainRow: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 16,
    gap: 18,
  },
  mainRowCompact: {
    flexDirection: 'column',
  },
});
