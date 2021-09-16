import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableNativeFeedback } from 'react-native';
import { IconButton } from 'react-native-paper';
import Accordion from 'react-native-collapsible/Accordion';

import OngoingCard from '../../../../components/Sessions/PublicSessions/OngoingSession';
import UpcomingCard from '../../../../components/Sessions/PublicSessions/UpcomingSession'
import { ScrollView } from 'react-native';


const SECTIONS = [
    {
        title: 'Ongoing Sessions',
        cards: [<OngoingCard />, <OngoingCard />]
    },
    {
        title: 'Upcoming Sessions',
        cards: [<UpcomingCard />, <UpcomingCard />]
    },
];

export default class AccordionView extends Component {
    state = {
        activeSections: [0],
    };

    _renderSectionTitle = section => {
        return (
            <View style={styles.content}>
                <Text>{section.content}</Text>
            </View>
        );
    };

    _renderHeader = section => {
        return (
            <View style={styles.header}>
                <Text style={styles.headerText}>{section.title}</Text>
                <IconButton icon="chevron-down" />
            </View>
        );
    };

    _renderContent = section => {
        return (
            <View style={styles.content}>
                {section.cards.map(card => card)}
            </View>
        );
    };

    _updateSections = activeSections => {

        this.setState({ activeSections });
    };

    render() {
        return (
            <ScrollView>
                <Accordion
                    sections={SECTIONS}
                    activeSections={this.state.activeSections}
                    touchableComponent={TouchableNativeFeedback}
                    renderSectionTitle={this._renderSectionTitle}
                    renderHeader={this._renderHeader}
                    renderContent={this._renderContent}
                    onChange={this._updateSections}
                />
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    header: {
        paddingHorizontal: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    headerText: {
        fontSize: 22,
        fontWeight: "400"
    }
})