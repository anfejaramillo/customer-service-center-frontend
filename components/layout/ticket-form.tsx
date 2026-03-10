import { Picker } from '@react-native-picker/picker';
import React, { useEffect, useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

import type { Ticket, User } from './types';

type Props = {
  customers: User[];
  agents: User[];
  onSubmit: (ticket: Ticket) => void;
  _ticket?: Ticket;
  isUpdate: boolean;
};

type FieldKey = 'title' | 'description' | 'customerId' | 'assignedAgentId';


const buildInitialTicket = (): Ticket => ({
  id: 0,
  assignedAgentId: 0,
  createdAt: new Date(),
  customerId: 0,
  description: '',
  priority: 'LOW',
  status: 'OPEN',
  title: '',
  updatedAt: new Date(),
  customerName: '',
  assignedAgentName: '',
});

type FormErrors = Partial<Record<keyof Ticket, string>>
type TouchedFields = Partial<Record<keyof Ticket, boolean>>


export default function TicketForm({ customers, agents, onSubmit, _ticket, isUpdate = false }: Props) {
  let initialValue = buildInitialTicket()
  if (_ticket)
    initialValue = _ticket;
  const [ticket, setTicket] = useState<Ticket>(initialValue);
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [touched, setTouched] = useState<Partial<Record<FieldKey, boolean>>>({});

  useEffect(() => {
    if (!isUpdate)
      handleReset();
  }, [_ticket])

  const errors = useMemo(() => {
    return {
      title: ticket.title.trim().length > 10 ? '' : 'Title must be at least 11 characters.',
      description:
        ticket.description.trim().length > 15 ? '' : 'Description must be at least 16 characters.',
      customerId: ticket.customerId > 0 ? '' : 'Please select a customer.',
      assignedAgentId: ticket.assignedAgentId > 0 ? '' : 'Please select an assigned agent.',
    };
  }, [ticket]);

  const canSubmit = useMemo(() => {
    return !errors.title && !errors.description && !errors.customerId && !errors.assignedAgentId;
  }, [errors]);



  const updateField = <K extends keyof Ticket>(field: K, value: Ticket[K]) => {
    setTicket((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const selectCustomer = (customerId: number) => {
    //const customer = customers.filter((c) => c.id == customerId)[0];
    setTouched((prev) => ({ ...prev, customerId: true }));
    const customer = customers.filter((c) => c.id == customerId)[0];

    if (!customer) {
      return;
    }

    setTicket((prev) => ({
      ...prev,
      customerId: customer.id,
      customerName: customer.name,
    }));
  };

  const selectAgent = (agentId: number) => {
    //const agent = agents.filter((a) => a.id == agentId)[0];
    setTouched((prev) => ({ ...prev, assignedAgentId: true }));
    const agent = agents.filter((a) => a.id == agentId)[0];

    if (!agent) {
      return;
    }

    setTicket((prev) => ({
      ...prev,
      assignedAgentId: agent.id,
      assignedAgentName: agent.name,
    }));
  };

  const handleSubmit = () => {
    if (!canSubmit) {
      setSubmitAttempted(true);
      return;
    }

    onSubmit({
      ...ticket,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  };

  const handleReset = () => {
    setTicket(buildInitialTicket());
    setSubmitAttempted(false);
    setTouched({});
  };

  const showError = (field: FieldKey) => Boolean(errors[field]) && (submitAttempted || touched[field]);

  return (
    <View style={styles.wrapper}>
      <View style={styles.glowA} />
      <View style={styles.glowB} />

      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.headerCard}>
          <Text style={styles.headerEyebrow}>New Ticket</Text>
          <Text style={styles.headerTitle}>Create Support Request</Text>
          <Text style={styles.headerSubtitle}>
            Fill the details and assign an agent to start the resolution workflow.
          </Text>
        </View>

        <View style={styles.formCard}>
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex. User cannot reset password"
            placeholderTextColor="#7b8699"
            value={ticket.title}
            onBlur={() => setTouched((prev) => ({ ...prev, title: true }))}
            onChangeText={(value) => updateField('title', value)}
          />
          {showError('title') && (
            <View style={styles.tooltip}>
              <Text style={styles.tooltipText}>{errors.title}</Text>
            </View>
          )}
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={[styles.input, styles.textarea]}
            placeholder="Describe the issue with context, steps and impact."
            placeholderTextColor="#7b8699"
            multiline
            textAlignVertical="top"
            value={ticket.description}
            onBlur={() => setTouched((prev) => ({ ...prev, description: true }))}

            onChangeText={(value) => updateField('description', value)}
          />
          {showError('description') && (
            <View style={styles.tooltip}>
              <Text style={styles.tooltipText}>{errors.description}</Text>
            </View>
          )}
          <View style={styles.row}>
            <View style={styles.column}>
              <Text style={styles.label}>Priority</Text>
              <View style={styles.pickerWrap}>
                <Picker
                  selectedValue={ticket.priority}
                  onValueChange={(value) => updateField('priority', value)}>
                  <Picker.Item label="Low" value="LOW" />
                  <Picker.Item label="Medium" value="MEDIUM" />
                  <Picker.Item label="High" value="HIGH" />
                  <Picker.Item label="MAX" value="MAX" />
                </Picker>
              </View>
            </View>

            <View style={styles.column}>
              <Text style={styles.label}>Status</Text>
              <View style={styles.pickerWrap}>
                <Picker
                  selectedValue={ticket.status}
                  onValueChange={(value) => updateField('status', value)}>
                  <Picker.Item label="Open" value="OPEN" />
                  <Picker.Item label="In Progress" value="IN_PROGRESS" />
                  <Picker.Item label="Resolved" value="RESOLVED" />
                </Picker>
              </View>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.column}>
              <Text style={styles.label}>Customer</Text>
              <View style={styles.pickerWrap}>
                <Picker selectedValue={ticket.customerId} enabled={!isUpdate} onValueChange={(value) => selectCustomer(value)}>
                  <Picker.Item key={-1} label='Please choose one option' value={-1} />
                  {customers.map((customer) => (
                    <Picker.Item key={customer.id} label={customer.name} value={customer.id} />
                  ))}
                </Picker>
              </View>
              {showError('customerId') && (
                <View style={styles.tooltip}>
                  <Text style={styles.tooltipText}>{errors.customerId}</Text>
                </View>
              )}
            </View>

            <View style={styles.column}>
              <Text style={styles.label}>Assigned Agent</Text>
              <View style={styles.pickerWrap}>
                <Picker selectedValue={ticket.assignedAgentId} onValueChange={(value) => selectAgent(value)}>
                  <Picker.Item key={-1} label='Please choose one option' value={-1} />
                  {agents.map((agent) => (
                    <Picker.Item key={agent.id} label={agent.name} value={agent.id} />
                  ))}
                </Picker>
              </View>
            </View>
            {showError('assignedAgentId') && (
              <View style={styles.tooltip}>
                <Text style={styles.tooltipText}>{errors.assignedAgentId}</Text>
              </View>
            )}
          </View>

          <View style={styles.buttonsRow}>
            <Pressable
              onPress={handleSubmit}
              style={[styles.submitButton, !canSubmit && styles.submitButtonDisabled]}
              disabled={!canSubmit}>
              <Text style={styles.submitButtonText}>
                {
                  isUpdate ? "Update" : "Create Ticket"
                }
              </Text>
            </Pressable>
            {
              !isUpdate ? <Pressable onPress={handleReset} style={styles.resetButton}>
                <Text style={styles.resetButtonText}>Reset</Text>
              </Pressable>
                : <></>
            }

          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    borderRadius: 28,
    borderWidth: 3,
    borderColor: '#111827',
    backgroundColor: '#e5e7eb',
    overflow: 'hidden',
    padding: 20,
    position: 'relative',
  },
  tooltip: {
    marginTop: 6,
    alignSelf: 'flex-start',
    backgroundColor: '#7f1d1d',
    borderColor: '#ef4444',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  tooltipText: {
    color: '#fee2e2',
    fontSize: 12,
    fontWeight: '600',
  },
  glowA: {
    position: 'absolute',
    top: -120,
    right: -70,
    width: 260,
    height: 260,
    borderRadius: 130,
    backgroundColor: '#d1d5db',
  },
  glowB: {
    position: 'absolute',
    bottom: -140,
    left: -80,
    width: 320,
    height: 320,
    borderRadius: 160,
    backgroundColor: '#f3f4f6',
  },
  container: {
    paddingBottom: 10,
    gap: 14,
  },
  headerCard: {
    borderWidth: 2,
    borderColor: '#0f172a',
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.84)',
    paddingVertical: 14,
    paddingHorizontal: 16,
    gap: 4,
  },
  headerEyebrow: {
    color: '#334155',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    fontWeight: '700',
    fontSize: 11,
  },
  headerTitle: {
    color: '#111827',
    fontSize: 26,
    fontWeight: '800',
  },
  headerSubtitle: {
    color: '#374151',
    fontSize: 14,
    lineHeight: 22,
    maxWidth: 700,
  },
  formCard: {
    borderWidth: 2,
    borderColor: '#1f2937',
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
    padding: 18,
  },
  label: {
    marginTop: 10,
    marginBottom: 6,
    color: '#111827',
    fontSize: 14,
    fontWeight: '700',
  },
  input: {
    borderWidth: 1.5,
    borderColor: '#cbd5e1',
    backgroundColor: '#f8fafc',
    color: '#0f172a',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
  },
  textarea: {
    minHeight: 60,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 4,
    flexWrap: 'wrap',
  },
  column: {
    flex: 1,
    minWidth: 220,
  },
  pickerWrap: {
    borderWidth: 1.5,
    borderColor: '#cbd5e1',
    borderRadius: 12,
    backgroundColor: '#f8fafc',
    overflow: 'hidden',
  },
  pickerWrapUpdated: {
    display: "none"
  },
  metaRow: {
    marginTop: 14,
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },
  metaText: {
    borderWidth: 1,
    borderColor: '#bfdbfe',
    backgroundColor: '#eff6ff',
    color: '#1e3a8a',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    fontSize: 12,
    fontWeight: '700',
  },
  buttonsRow: {
    marginTop: 18,
    flexDirection: 'row',
    gap: 10,
    flexWrap: 'wrap',
  },
  submitButton: {
    backgroundColor: '#0f172a',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderWidth: 2,
    borderColor: '#0f172a',
  },
  submitButtonDisabled: {
    opacity: 0.45,
  },
  submitButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: 0.3,
  },
  resetButton: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderWidth: 2,
    borderColor: '#9ca3af',
  },
  resetButtonText: {
    color: '#374151',
    fontSize: 14,
    fontWeight: '700',
  },
});